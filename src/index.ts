import {
  getExceptionInstance,
  HttpRequestException,
} from '@srclaunch/exceptions';
import { Logger } from '@srclaunch/logger';
import {
  HttpRequestBody,
  HttpRequestHeaders,
  HttpRequestHost,
  HttpRequestMethod,
  HttpRequestResource,
  HttpResponse,
  HttpResponseBody,
} from '@srclaunch/types';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { nanoid } from 'nanoid';

export type { HttpResponseCodeDetailsType } from './types/http';
export { HttpResponseCodeDetails } from './types/http';

export type HttpClientRetryOptions = {
  readonly count?: number;
  readonly delay?: number;
  readonly condition?: (err: AxiosError) => boolean;
};

export interface HttpClientRequestBaseArgs {
  readonly resource: HttpRequestResource;
}

export type HttpClientDeleteMethodRequestArgs = HttpClientRequestBaseArgs;
export type HttpClientGetMethodRequestArgs = HttpClientRequestBaseArgs;
export type HttpClientHeadMethodRequestArgs = HttpClientRequestBaseArgs;

export interface HttpClientPostMethodRequestArgs
  extends HttpClientRequestBaseArgs {
  readonly body?: HttpRequestBody;
}
export interface HttpClientPutMethodRequestArgs
  extends HttpClientRequestBaseArgs {
  readonly body?: HttpRequestBody;
}

export type HttpClientRequestMethodArgs =
  | HttpClientDeleteMethodRequestArgs
  | HttpClientGetMethodRequestArgs
  | HttpClientHeadMethodRequestArgs
  | HttpClientPostMethodRequestArgs
  | HttpClientPutMethodRequestArgs;

export type HttpClientRequest<T> = (
  resource: HttpRequestResource,
  args: HttpClientRequestMethodArgs,
) => Promise<HttpResponse<T>>;

export type HttpClientOptions = {
  readonly basePath?: string;
  readonly host?: HttpRequestHost;
  readonly headers?: HttpRequestHeaders;
  readonly logger?: Logger;
  readonly preAuthResourceIncludes?: string;
  readonly responseType?: 'json' | 'text';
  readonly retry?: HttpClientRetryOptions;
  readonly withCredentials?: boolean;
};

const DEFAULT_RETRY_DELAY = 5000;
const DEFAULT_RETRY_COUNT = 0;

export class HttpClient {
  private readonly axiosClient: AxiosInstance;
  private readonly basePath?: string = '';
  private readonly host?: string;
  private readonly headers?: HttpRequestHeaders;
  private readonly logger: Logger;
  private readonly retry?: HttpClientRetryOptions;

  public constructor(options: HttpClientOptions) {
    const { basePath, host, headers, logger } = options;

    this.basePath = basePath;
    this.host = host;
    this.headers = headers;
    this.axiosClient = axios.create({ headers });
    this.logger = logger ?? new Logger();
  }

  public async delete<T>(
    resource: HttpRequestResource,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<HttpResponseBody<T>>> {
    return this.request<T>({
      headers: options?.headers,
      method: HttpRequestMethod.Delete,
      resource,
      retry: options?.retry,
    });
  }

  public async head(
    resource: HttpRequestResource,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<null> | null> {
    return this.request({
      headers: options?.headers,
      method: HttpRequestMethod.Head,
      resource,
      retry: options?.retry,
    });
  }

  public async get<T>(
    resource: HttpRequestResource,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<HttpResponseBody<T>>> {
    return this.request({
      headers: options?.headers,
      method: HttpRequestMethod.Get,
      resource,
      retry: options?.retry,
    });
  }

  public async patch<T>(
    resource: HttpRequestResource,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<HttpResponseBody<T>>> {
    return this.request({
      headers: options?.headers,
      method: HttpRequestMethod.Patch,
      resource,
      retry: options?.retry,
    });
  }

  public async post<T>(
    resource: HttpRequestResource,
    body?: HttpRequestBody,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<HttpResponseBody<T>>> {
    return this.request({
      body,
      headers: options?.headers,
      method: HttpRequestMethod.Post,
      resource,
      retry: options?.retry,
    });
  }

  public async put<T>(
    resource: HttpRequestResource,
    body?: HttpRequestBody,
    options?: {
      readonly headers?: HttpRequestHeaders;
      readonly retry?: HttpClientRetryOptions;
    },
  ): Promise<HttpResponse<HttpResponseBody<T>>> {
    return this.request({
      body,
      headers: options?.headers,
      method: HttpRequestMethod.Put,
      resource,
      retry: options?.retry,
    });
  }

  private async request<T>({
    body,
    headers,
    method,
    resource,
    retry,
  }: {
    readonly body?: HttpRequestBody;
    readonly headers?: HttpRequestHeaders;
    readonly method: HttpRequestMethod;
    readonly retry?: HttpClientRetryOptions;
    readonly resource: HttpRequestResource;
  }): Promise<HttpResponse<T>> {
    const requestId = nanoid();

    const defaultRetryCondition = (err: AxiosError) => {
      return !err.code;
    };

    const retryCondition = (err: AxiosError) => {
      if (retry?.condition) {
        return retry.condition(err);
      }

      return defaultRetryCondition(err);
    };

    axiosRetry(this.axiosClient, {
      retries: retry?.count ?? this.retry?.count ?? DEFAULT_RETRY_COUNT,
      retryCondition,
      retryDelay: () =>
        retry?.delay ?? this.retry?.delay ?? DEFAULT_RETRY_DELAY,
    });

    switch (method) {
      case HttpRequestMethod.Delete:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.delete(
            this.host + (this?.basePath ? `/${this?.basePath}` : '') + resource,
            {
              headers: {
                ...this.headers,
                ...headers,
                'X-Request-Id': requestId,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
      case HttpRequestMethod.Get:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.get(
            this.host + (this?.basePath ? `/${this?.basePath}` : '') + resource,
            {
              headers: {
                ...this.headers,
                ...headers,
                'X-Request-Id': requestId,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
      case HttpRequestMethod.Head:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.head(
            this.host + (this.basePath ? `/${this.basePath}` : '') + resource,
            {
              headers: {
                ...this.headers,
                ...headers,
                'X-Request-Id': requestId,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
      case HttpRequestMethod.Post:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.post(
            this.host + (this?.basePath ? `/${this?.basePath}` : '') + resource,
            body,
            {
              headers: {
                'X-Request-Id': requestId,
                ...this.headers,
                ...headers,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
      case HttpRequestMethod.Patch:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.patch(
            this.host + (this?.basePath ? `/${this?.basePath}` : '') + resource,
            body,
            {
              headers: {
                ...this.headers,
                ...headers,
                'X-Request-Id': requestId,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
      case HttpRequestMethod.Put:
        return this.getResponse<T>({
          method,
          requestId,
          resource,
          response: await this.axiosClient.put(
            this.host + (this?.basePath ? `/${this?.basePath}` : '') + resource,
            body,
            {
              headers: {
                ...this.headers,
                ...headers,
                'X-Request-Id': requestId,
              },
              validateStatus(status) {
                return status >= 200 && status < 500;
              },
            },
          ),
        });
    }
  }

  private async getResponse<T>({
    method,
    requestId,
    response,
    resource,
  }: {
    readonly method: HttpRequestMethod;
    readonly requestId: string;
    readonly response: AxiosResponse<HttpRequestException | any>;
    readonly resource: HttpRequestResource;
  }): Promise<HttpResponse<T>> {
    if (response.data?.code) {
      const exception = getExceptionInstance(response.data?.code);

      if (exception) {
        return {
          body: response.data,
          details: {
            request: {
              id: requestId,
            },
          },
          headers: response.headers,
          status: {
            code: response.status,
          },
        };
      }
    }

    return {
      body: response.data,
      details: {
        request: {
          id: requestId,
        },
      },
      headers: response.headers,
      status: {
        code: response.status,
      },
    };
  }
}
// export function HttpClient(config: HttpClientConfig): HttpClientSignature {
//   return {
//     delete: ,
//     get: async <T>(
//       resource: HttpRequestResource,
//       options?: HttpClientRequestOptions,
//     ) =>
//       RequestHandler<T>({
//         config,
//         method: HttpRequestMethod.Get,
//         options,
//         resource,
//       }),
//     head: async (
//       resource: HttpRequestResource,
//       options?: HttpClientRequestOptions,
//     ) =>
//       RequestHandler({
//         config,
//         method: HttpRequestMethod.Head,
//         options,
//         resource,
//       }),
//     patch: async <T>(
//       resource: HttpRequestResource,
//       body?: HttpRequestBody,
//       options?: HttpClientRequestOptions,
//     ) =>
//       RequestHandler<T>({
//         body,
//         config,
//         method: HttpRequestMethod.Put,
//         options,
//         resource,
//       }),
//     post: async <T>(
//       resource: HttpRequestResource,
//       body?: HttpRequestBody,
//       options?: HttpClientRequestOptions,
//     ) =>
//       RequestHandler<T>({
//         body,
//         config,
//         method: HttpRequestMethod.Post,
//         options,
//         resource,
//       }),
//     put: async <T>(
//       resource: HttpRequestResource,
//       body?: HttpRequestBody,
//       options?: HttpClientRequestOptions,
//     ) =>
//       RequestHandler<T>({
//         body,
//         config,
//         method: HttpRequestMethod.Put,
//         options,
//         resource,
//       }),
//   };
// }
