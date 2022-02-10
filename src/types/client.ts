import {
  HttpRequestBody,
  HttpRequestHeaders,
  HttpRequestHost,
  HttpRequestResource,
  HttpResponse,
} from '@srclaunch/types';
import { AxiosError } from 'axios';

export type HttpClientRequestOptions = {
  headers?: HttpRequestHeaders;
  retries?: number;
  retryDelay?: number;
  retryCondition?: (err: AxiosError) => boolean;
};

export interface HttpClientRequestBaseArgs {
  resource: HttpRequestResource;
  options?: HttpClientRequestOptions;
}

export type HttpClientDeleteMethodRequestArgs = HttpClientRequestBaseArgs;
export type HttpClientGetMethodRequestArgs = HttpClientRequestBaseArgs;
export type HttpClientHeadMethodRequestArgs = HttpClientRequestBaseArgs;

export interface HttpClientPostMethodRequestArgs
  extends HttpClientRequestBaseArgs {
  body?: HttpRequestBody;
}
export interface HttpClientPutMethodRequestArgs
  extends HttpClientRequestBaseArgs {
  body?: HttpRequestBody;
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

export type HttpClientConfig = {
  basePath?: string;
  host?: HttpRequestHost;
  headers?: HttpRequestHeaders;
  withCredentials?: boolean;
  options?: HttpClientRequestOptions;
  responseType?: 'json' | 'text';
  preAuthResourceIncludes?: string;
};
