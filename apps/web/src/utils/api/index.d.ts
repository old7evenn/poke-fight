interface MutationSettings<Params = void, Func = unknown> {
  config?: RequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: RequestOptions;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >;
}

interface InfiniteQuerySettings<Func = unknown> {
  config?: RequestOptions;
  options?: Omit<
    import('@tanstack/react-query').UseInfiniteQueryOptions<
      Awaited<ReturnTyp<Func>>,
      any,
      Awaited<ReturnTyp<Func>>,
      any,
      import('@tanstack/react-query').QueryKey,
      number
    >,
    'queryKey'
  >;
}

type BaseUrl = string;

type RequestMethod = RequestInit['method'];

interface HttpClientSearchParams {
  [key: string]: boolean | number | string | string[];
}

type _RequestConfig = RequestInit & {
  url: string;
  _retry?: boolean;
  headers?: Record<string, string>;
  params?: HttpClientSearchParams;
};

interface InterceptorResponseResult {
  data: any;
  headers: Response['headers'];
  status: Response['status'];
  statusText: Response['statusText'];
  success: Response['ok'];
  url: string;
}

type SuccessResponseFun = (res: InterceptorResponseResult) => InterceptorResponseResult['data'];

type SuccessRequestFun = (options: _RequestConfig) => _RequestConfig | Promise<_RequestConfig>;

type ResponseError = Error & {
  config: _RequestConfig;
  response: InterceptorResponseResult;
};

type FailureResponseFun = (e: ResponseError) => any;

type FailureRequestFun = (e: ResponseError) => any;

interface RequestInterceptor {
  onFailure?: FailureRequestFun;
  onSuccess?: SuccessRequestFun;
}

interface ResponseInterceptor {
  onFailure?: FailureResponseFun;
  onSuccess?: SuccessResponseFun;
}
interface Interceptors {
  request?: RequestInterceptor[];
  response?: ResponseInterceptor[];
}

type RequestBody = FormData | Record<string, any>;

type RequestOptions = {
  headers?: Record<string, string>;
  params?: HttpClientSearchParams;
} & Omit<RequestInit, 'method'>;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: RequestOptions }
  : { params: Partial<Params>; config?: RequestOptions };

interface BaseResponse {
  message: string;
}
