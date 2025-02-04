# Capa backend coding test

## About this task

Think of this as an open source project. How would this have to look in order for you to be impressed with it.

Please spend at least 90 minutes on this test. Feel free to take more time if you wish - make sure you are happy with your submission!

_Hint_: we are looking for a high-quality submission with great application architecture. Not a "get it done" approach.

Remember that this test is your opportunity to show us how you think. Be clear about how you make decisions in your code, whether that is with comments, tests, or how you name things.

## What to do

### First

- Create a new Javascript-based api service (any framework is fine)
  - TypeScript would be good, too.

### Make your API consumer happy

Let API consumer

- can get the list of stores in `stores.json`
- can get the specific item of stores in `stores.json`
  - Your API consumer can identify the item with its name
- can get the latitude and longitude for each postcode.
  - You can use postcodes.io to get the latitude and longitudefor each postcode.
- can get the functionality that allows you to return a list of stores in a given radius of a given postcode in the UK. The list must be ordered from north to south.

### Finally

- Send the link of your repository.
- Provide answers for the following questions with your submission:

  1. If you had chosen to spend more time on this test, what would you have done differently?

     - 이번 코딩테스트를 계기로 제가 부족한점이 어떤게 있는지 알 수 있었습니다.
       첫째로, HTTP상태코드를 좀 더 깊게 공부한 후 정확한 상태코드를 반환하고싶습니다. 예를들어 이때까지 진행한 프로젝트에서는
       성공은 200대, 오류는400대, 서버에러는 500 이렇게 단순하게만 생각했던 상태코드들이 반환하는 data가 없다고해서 모두 에러코드인 400대가 아니라는걸 알았고,
       좀 더 깊게 공부해야 될 필요성을 느꼈습니다.

       두번째로는, 시간이 좀 더 있었다면 자바스크립트 컨벤션을 공부해서 좀 더 가독성이 있는 코드를 작성할 수 있지 않았을까 하는 아쉬움이 있었습니다.
       자주 연습을 하고 또 매번 고민하는 부분이지만 프로젝트를 끝낸 후 돌아보면 항상 가독성이 떨어진다는 아쉬움이 있었습니다. 이번 코딩테스트를 통해 조금 더 성장할 수 있는 계기가 되었고,
       앞으로 오픈소스 또는 선배 개발자들의 코드를 보면서 가독성 있는 코드를 작성할 수 있도록 꾸준히 노력할 계획입니다.

  2. What part did you find the hardest? What part are you most proud of? In both cases, why?

     - 먼저 가장 어려웠던 부분은 마지막 문제였습니다. 문제의 의도를 정확하게 파악하지못해 몇번이나 다시 읽고 코드를 썻다가 지웟다가 반복했던거같습니다.
       코드 구현을 끝내고 난 지금 시점까지도 마지막 문제의 의도가 제가 구현한 로직과 일치하는지 확신이들지 않습니다.

     - 이번 코딩테스트를 진행하면서 만족스러웠던 부분은 혼자힘으로 한 회사의 코딩테스트를 정답이든 오답이든 완료했다는점 입니다.
       부트캠프를 수료하고 한달 쯤 지난 시점에서 '과연 내 실력으로 개발자로의 커리어전환이 가능할까?' 라는 의구심이 점점 커져가던 중,
       좋은 기회를 주셔서 저한테는 멋진 경험이였고, 기쁜마음으로 테스트를 완료할 수 있었습니다.

  3. What is one thing we could do to improve this test?

     - stores.json의 데이터가 좀 더 풍부했으면 좋겠습니다.
       마지막 테스트 같은 경우 postcodes.io 에서 api 요청을 보내면 좌표와 postcode 등 지리적 정보가 반환되고 stores.json에 데이터가 많지 않다보니
       radius를 아무리 크게 설정해도 근처 상점은 반환되지 않고 그 postcode에 해당하는 상점만 반환이되어서 문제의 의도를 정확하게 파악하기가 힘들었습니다.
       stores.json에 제일 상단에 있는 postcode를 이용하여 postcodes.io 에서 가까이있는 postcode를 참고하여 fake data를 생성했습니다.
       그 후, api를 요청해보니 fake data를 포함한 상점 리스트가 반환되는 것을 볼 수 있었습니다.
       이처럼 stores.json에 좀 더 많은 데이터가 있었다면 문제 의도를 조금 더 명확하게 파악할 수 있었을 것 같습니다.

---

## Api Documents

#### baseUrl

```
http://localhost:2020
```

---

### getAllStores(stores.json의 모든 리스트 조회)

#### request

```
GET /stores
```

#### response

- 200

```
[
  {
    "name": "St_Albans",
    "postcode": "AL1 2RJ"
  },
  {
    "name": "fake1",
    "postcode": "AL1 2DF"
  },
  {
    "name": "fake2",
    "postcode": "AL1 2JU"
  }, ...
]
```

---

### getStoreByName(이름으로 특정 store 조회)

#### request

```
GET /stores/:storeName
```

#### response

- 200

```
{
    "name": "Hatfield",
    "postcode": "AL9 5JP"
}
```

- 200(name이 없을 경우)

```
{
    "Store Not Found"
}
```

---

### getGeoLocationByPostcode(postcode를 이용하여 geolocation 조회)

#### request

```
GET /stores/geolocation/:postcode
```

#### response

- 200

```
{
    "latitude": 51.154921,
    "longitude": 0.288514
}
```

- 200(postcode가 없을 경우)

```
{
    "Postcode not found"
}
```

---

### getAllStoresByGeoLocation(geolocation과 postcode를 이용하여 근처에있는 stores 정보 조회)

#### request

```
POST /stores/:postcode
```

#### response

- 200

```
[
    {
        "name": "St_Albans",
        "postcode": "AL1 2RJ"
    },
    {
        "name": "fake1",
        "postcode": "AL1 2DF"
    },
    {
        "name": "fake2",
        "postcode": "AL1 2JU"
    }
]
```

- 200(postcode에 해당하는 상점이 없을 경우)

```
{
    "Store not found with a given postcode"
}
```
