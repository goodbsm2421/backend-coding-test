const stores = require('../../stores.json');
const axios = require('axios');

module.exports = {
  getAllStores: async (req, res) => {
    // 모든 Store의 Lists 조회
    try {
      return res.status(200).json(stores);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getStoreByName: async (req, res) => {
    // Params로 들어오는 Store name에 맞는 Store 정보 조회
    const storeName = req.params.storeName;
    // Params로 들어오는 상점의 이름과 stores.json 의 상점의 이름이 같을경우 store 변수에 상점 정보를 할당
    const store = stores.find((storeInfo) => storeInfo.name === storeName);
    try {
      // 일치하는 정보가 없을경우 에러메시지 반환
      if (!store) {
        return res.status(200).json('Store Not Found');
      }
      return res.status(200).json(store);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getGeoLocationByPostcode: async (req, res) => {
    //postcode를 이용하여 Store 의 Latitude 와 Longitude 조회
    const postcode = req.params.postcode;
    try {
      //postcode가 없거나 잘못된경우 에러메시지 반환
      if (!postcode) {
        return res.status(200).json('Invalid postcode');
      }
      //postcode가 일치한다면 endpoint 로 get요청을 보낸 후, latitude 와 longitude 조회
      const locationInfo = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}`
      );
      const latitude = locationInfo.data.result.latitude;
      const longitude = locationInfo.data.result.longitude;
      return res.status(200).json({ latitude, longitude });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },

  getAllStoresByGeoLocation: async (req, res) => {
    //postcode 를 이용하여 Store의 위도와 경도를 조회한 후 위,경도를 토대로 근처 Store List 조회
    const postcode = req.params.postcode;
    const { radius, limit } = req.body;
    //getGeoLocationByPostcode를 이용하여 위, 경도 조회
    const data = await axios.get(
      `http://localhost:2020/stores/geolocation/${postcode}`
    );
    //조회한 위,경도를 토대로 end point 로 post 요청 후 response 값 조회
    const storesInfo = await axios.post('https://api.postcodes.io/postcodes', {
      geolocations: [
        {
          latitude: data.data.latitude,
          longitude: data.data.longitude,
          radius,
          limit,
        },
      ],
    });
    //response 값 중 필요한 부분만 변수에 할당
    const results = storesInfo.data.result[0].result;
    //stores.json 의 postcode 와 results 의 postcode를 비교해주기위해 stores.json 을 map 을 이용하여 postcode만 따로 조회해서 변수에 할당
    const storesPostcodeList = stores.map((store) => store.postcode);
    //filter를 사용하여 results 배열 안의 postcode 들을 순회하며 stores.json 의 postcode와 일치하는 상점 정보만 조회
    const storeList = results.filter((result) =>
      storesPostcodeList.includes(result.postcode)
    );
    // 북쪽에서 남쪽으로 재배열을위한 storeList의 northing의 값이 적은 순서대로 sorting
    storeList.sort((a, b) =>
      a.northings > b.northings ? 1 : a.northings < b.northings ? -1 : 0
    );
    //stores.json 의 상점정보를 반환하기위해 storeList의 postcode 부분만 mapping 하여 조회
    const storeListPostcode = storeList.map((data) => data.postcode);
    // stores를 filter를 사용하여 stroeList의 postcode와 일치하는 상점 정보만 반환하여 변수에 할당
    const result = stores.filter((store) =>
      storeListPostcode.includes(store.postcode)
    );
    try {
      if (result.length === 0) {
        //result 값이 없으면 에러메시지 반환
        return res.status(200).json('Store not found with a given postcode');
      }
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
};
