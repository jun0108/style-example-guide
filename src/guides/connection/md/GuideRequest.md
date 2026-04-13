# Request

별도의 import 이나 선언 없이 사용한다.

## API Reference

#### post

```
post(options: post<R = any, P = any>(options: RequestBaseOptions & { data?: P }) => Promise<R>
```

#### upload

```
upload<R = any, P = any>(options: RequestBaseOptions & { data?: FormData | File })=> Promise<R>
```

#### download

```
download<P = any>(options: RequestBaseOptions & { data?: P }) => void
```

## Types

#### RequestBaseOptions

```ts
type RequestBaseOptions = {
  url: string;
  xMid: string;
  config?: AxiosRequestConfig;
};
```

| 옵션   | 타입               | 기본값 | 설명                         |
| ------ | ------------------ | ------ | ---------------------------- |
| url    | string             |        | 필수                         |
| xMid   | string             |        | 필수, P코드                  |
| config | AxiosRequestConfig |        | Axios의 `AxiosRequestConfig` |

## Uasge

### 기본 호출

```vue
<script>
async function postData() {
  try {
    const response =
      (await request.post) <
      RequestResponse <
      UserInfoRes >>
        {
          url: '/sample/client',
          xMid: 'P000000',
          data: {
            date: new Date().getTime(),
          },
        };
    result.value = response.data;
  } catch (e) {
    console.error(e);
  }
}
</script>
```
