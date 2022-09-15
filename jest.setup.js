import { fetch, Request, Response, Headers, DOMException } from 'whatwg-fetch';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.DOMException = DOMException;
