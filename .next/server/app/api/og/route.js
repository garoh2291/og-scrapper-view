/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/og/route";
exports.ids = ["app/api/og/route"];
exports.modules = {

/***/ "(rsc)/./app/api/og/route.ts":
/*!*****************************!*\
  !*** ./app/api/og/route.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var cheerio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheerio */ \"(rsc)/./node_modules/cheerio/dist/esm/index.js\");\n\n\n\nasync function GET(req) {\n    const url = req.nextUrl.searchParams.get('url');\n    if (!url) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'URL is required'\n        }, {\n            status: 400\n        });\n    }\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(url, {\n            headers: {\n                'User-Agent': 'Mozilla/5.0 (compatible; OGScraper/1.0)',\n                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',\n                'Accept-Language': 'en-US,en;q=0.5'\n            },\n            timeout: 10000,\n            maxRedirects: 5\n        });\n        const $ = cheerio__WEBPACK_IMPORTED_MODULE_1__.load(response.data);\n        const getMeta = (name)=>$(`meta[property=\"${name}\"]`).attr('content') || $(`meta[name=\"${name}\"]`).attr('content') || '';\n        const parsedUrl = new URL(url);\n        const domain = parsedUrl.hostname.replace('www.', '');\n        const faviconHref = $('link[rel=\"icon\"], link[rel=\"shortcut icon\"]').first().attr('href') || '/favicon.ico';\n        const favicon = faviconHref.startsWith('http') ? faviconHref : `${parsedUrl.protocol}//${parsedUrl.hostname}${faviconHref.startsWith('/') ? '' : '/'}${faviconHref}`;\n        const rawImage = getMeta('og:image');\n        const image = rawImage ? rawImage.startsWith('http') ? rawImage : `${parsedUrl.protocol}//${parsedUrl.hostname}${rawImage.startsWith('/') ? '' : '/'}${rawImage}` : '';\n        const xfo = response.headers['x-frame-options'];\n        const csp = response.headers['content-security-policy'] || '';\n        const canEmbed = !xfo && !csp.includes('frame-ancestors');\n        const data = {\n            url,\n            domain,\n            title: getMeta('og:title') || $('title').text().trim() || domain,\n            description: getMeta('og:description') || getMeta('description') || '',\n            image,\n            siteName: getMeta('og:site_name') || domain,\n            type: getMeta('og:type') || 'website',\n            favicon,\n            themeColor: $('meta[name=\"theme-color\"]').attr('content') || '#000000',\n            canEmbed\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n    } catch (err) {\n        const message = err instanceof Error ? err.message : 'Failed to fetch URL';\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL29nL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBdUQ7QUFDOUI7QUFDUztBQWUzQixlQUFlRyxJQUFJQyxHQUFnQjtJQUN4QyxNQUFNQyxNQUFNRCxJQUFJRSxPQUFPLENBQUNDLFlBQVksQ0FBQ0MsR0FBRyxDQUFDO0lBRXpDLElBQUksQ0FBQ0gsS0FBSztRQUNSLE9BQU9MLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFrQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN2RTtJQUVBLElBQUk7UUFDRixNQUFNQyxXQUFXLE1BQU1YLDZDQUFLQSxDQUFDTyxHQUFHLENBQUNILEtBQUs7WUFDcENRLFNBQVM7Z0JBQ1AsY0FBYztnQkFDZEMsUUFBUTtnQkFDUixtQkFBbUI7WUFDckI7WUFDQUMsU0FBUztZQUNUQyxjQUFjO1FBQ2hCO1FBRUEsTUFBTUMsSUFBSWYseUNBQVksQ0FBQ1UsU0FBU08sSUFBSTtRQUVwQyxNQUFNQyxVQUFVLENBQUNDLE9BQ2ZKLEVBQUUsQ0FBQyxlQUFlLEVBQUVJLEtBQUssRUFBRSxDQUFDLEVBQUVDLElBQUksQ0FBQyxjQUNuQ0wsRUFBRSxDQUFDLFdBQVcsRUFBRUksS0FBSyxFQUFFLENBQUMsRUFBRUMsSUFBSSxDQUFDLGNBQy9CO1FBRUYsTUFBTUMsWUFBWSxJQUFJQyxJQUFJbkI7UUFDMUIsTUFBTW9CLFNBQVNGLFVBQVVHLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDLFFBQVE7UUFFbEQsTUFBTUMsY0FDSlgsRUFBRSwrQ0FBK0NZLEtBQUssR0FBR1AsSUFBSSxDQUFDLFdBQVc7UUFDM0UsTUFBTVEsVUFBVUYsWUFBWUcsVUFBVSxDQUFDLFVBQ25DSCxjQUNBLEdBQUdMLFVBQVVTLFFBQVEsQ0FBQyxFQUFFLEVBQUVULFVBQVVHLFFBQVEsR0FBR0UsWUFBWUcsVUFBVSxDQUFDLE9BQU8sS0FBSyxNQUFNSCxhQUFhO1FBRXpHLE1BQU1LLFdBQVdiLFFBQVE7UUFDekIsTUFBTWMsUUFBUUQsV0FDVkEsU0FBU0YsVUFBVSxDQUFDLFVBQ2xCRSxXQUNBLEdBQUdWLFVBQVVTLFFBQVEsQ0FBQyxFQUFFLEVBQUVULFVBQVVHLFFBQVEsR0FBR08sU0FBU0YsVUFBVSxDQUFDLE9BQU8sS0FBSyxNQUFNRSxVQUFVLEdBQ2pHO1FBRUosTUFBTUUsTUFBTXZCLFNBQVNDLE9BQU8sQ0FBQyxrQkFBa0I7UUFDL0MsTUFBTXVCLE1BQU14QixTQUFTQyxPQUFPLENBQUMsMEJBQTBCLElBQUk7UUFDM0QsTUFBTXdCLFdBQVcsQ0FBQ0YsT0FBTyxDQUFDQyxJQUFJRSxRQUFRLENBQUM7UUFFdkMsTUFBTW5CLE9BQWU7WUFDbkJkO1lBQ0FvQjtZQUNBYyxPQUFPbkIsUUFBUSxlQUFlSCxFQUFFLFNBQVN1QixJQUFJLEdBQUdDLElBQUksTUFBTWhCO1lBQzFEaUIsYUFBYXRCLFFBQVEscUJBQXFCQSxRQUFRLGtCQUFrQjtZQUNwRWM7WUFDQVMsVUFBVXZCLFFBQVEsbUJBQW1CSztZQUNyQ21CLE1BQU14QixRQUFRLGNBQWM7WUFDNUJVO1lBQ0FlLFlBQVk1QixFQUFFLDRCQUE0QkssSUFBSSxDQUFDLGNBQWM7WUFDN0RlO1FBQ0Y7UUFFQSxPQUFPckMscURBQVlBLENBQUNTLElBQUksQ0FBQ1U7SUFDM0IsRUFBRSxPQUFPMkIsS0FBSztRQUNaLE1BQU1DLFVBQVVELGVBQWVFLFFBQVFGLElBQUlDLE9BQU8sR0FBRztRQUNyRCxPQUFPL0MscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxPQUFPcUM7UUFBUSxHQUFHO1lBQUVwQyxRQUFRO1FBQUk7SUFDN0Q7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL2JlZXdlYi9Eb2N1bWVudHMvR2FybmlrL1BsYXltYWRlL29nLXNjcmFwcGVyL2FwcC9hcGkvb2cvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0ICogYXMgY2hlZXJpbyBmcm9tICdjaGVlcmlvJ1xuXG5leHBvcnQgaW50ZXJmYWNlIE9HRGF0YSB7XG4gIHVybDogc3RyaW5nXG4gIGRvbWFpbjogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBpbWFnZTogc3RyaW5nXG4gIHNpdGVOYW1lOiBzdHJpbmdcbiAgdHlwZTogc3RyaW5nXG4gIGZhdmljb246IHN0cmluZ1xuICB0aGVtZUNvbG9yOiBzdHJpbmdcbiAgY2FuRW1iZWQ6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IHVybCA9IHJlcS5uZXh0VXJsLnNlYXJjaFBhcmFtcy5nZXQoJ3VybCcpXG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VSTCBpcyByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKGNvbXBhdGlibGU7IE9HU2NyYXBlci8xLjApJyxcbiAgICAgICAgQWNjZXB0OiAndGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44JyxcbiAgICAgICAgJ0FjY2VwdC1MYW5ndWFnZSc6ICdlbi1VUyxlbjtxPTAuNScsXG4gICAgICB9LFxuICAgICAgdGltZW91dDogMTAwMDAsXG4gICAgICBtYXhSZWRpcmVjdHM6IDUsXG4gICAgfSlcblxuICAgIGNvbnN0ICQgPSBjaGVlcmlvLmxvYWQocmVzcG9uc2UuZGF0YSlcblxuICAgIGNvbnN0IGdldE1ldGEgPSAobmFtZTogc3RyaW5nKSA9PlxuICAgICAgJChgbWV0YVtwcm9wZXJ0eT1cIiR7bmFtZX1cIl1gKS5hdHRyKCdjb250ZW50JykgfHxcbiAgICAgICQoYG1ldGFbbmFtZT1cIiR7bmFtZX1cIl1gKS5hdHRyKCdjb250ZW50JykgfHxcbiAgICAgICcnXG5cbiAgICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybClcbiAgICBjb25zdCBkb21haW4gPSBwYXJzZWRVcmwuaG9zdG5hbWUucmVwbGFjZSgnd3d3LicsICcnKVxuXG4gICAgY29uc3QgZmF2aWNvbkhyZWYgPVxuICAgICAgJCgnbGlua1tyZWw9XCJpY29uXCJdLCBsaW5rW3JlbD1cInNob3J0Y3V0IGljb25cIl0nKS5maXJzdCgpLmF0dHIoJ2hyZWYnKSB8fCAnL2Zhdmljb24uaWNvJ1xuICAgIGNvbnN0IGZhdmljb24gPSBmYXZpY29uSHJlZi5zdGFydHNXaXRoKCdodHRwJylcbiAgICAgID8gZmF2aWNvbkhyZWZcbiAgICAgIDogYCR7cGFyc2VkVXJsLnByb3RvY29sfS8vJHtwYXJzZWRVcmwuaG9zdG5hbWV9JHtmYXZpY29uSHJlZi5zdGFydHNXaXRoKCcvJykgPyAnJyA6ICcvJ30ke2Zhdmljb25IcmVmfWBcblxuICAgIGNvbnN0IHJhd0ltYWdlID0gZ2V0TWV0YSgnb2c6aW1hZ2UnKVxuICAgIGNvbnN0IGltYWdlID0gcmF3SW1hZ2VcbiAgICAgID8gcmF3SW1hZ2Uuc3RhcnRzV2l0aCgnaHR0cCcpXG4gICAgICAgID8gcmF3SW1hZ2VcbiAgICAgICAgOiBgJHtwYXJzZWRVcmwucHJvdG9jb2x9Ly8ke3BhcnNlZFVybC5ob3N0bmFtZX0ke3Jhd0ltYWdlLnN0YXJ0c1dpdGgoJy8nKSA/ICcnIDogJy8nfSR7cmF3SW1hZ2V9YFxuICAgICAgOiAnJ1xuXG4gICAgY29uc3QgeGZvID0gcmVzcG9uc2UuaGVhZGVyc1sneC1mcmFtZS1vcHRpb25zJ11cbiAgICBjb25zdCBjc3AgPSByZXNwb25zZS5oZWFkZXJzWydjb250ZW50LXNlY3VyaXR5LXBvbGljeSddIHx8ICcnXG4gICAgY29uc3QgY2FuRW1iZWQgPSAheGZvICYmICFjc3AuaW5jbHVkZXMoJ2ZyYW1lLWFuY2VzdG9ycycpXG5cbiAgICBjb25zdCBkYXRhOiBPR0RhdGEgPSB7XG4gICAgICB1cmwsXG4gICAgICBkb21haW4sXG4gICAgICB0aXRsZTogZ2V0TWV0YSgnb2c6dGl0bGUnKSB8fCAkKCd0aXRsZScpLnRleHQoKS50cmltKCkgfHwgZG9tYWluLFxuICAgICAgZGVzY3JpcHRpb246IGdldE1ldGEoJ29nOmRlc2NyaXB0aW9uJykgfHwgZ2V0TWV0YSgnZGVzY3JpcHRpb24nKSB8fCAnJyxcbiAgICAgIGltYWdlLFxuICAgICAgc2l0ZU5hbWU6IGdldE1ldGEoJ29nOnNpdGVfbmFtZScpIHx8IGRvbWFpbixcbiAgICAgIHR5cGU6IGdldE1ldGEoJ29nOnR5cGUnKSB8fCAnd2Vic2l0ZScsXG4gICAgICBmYXZpY29uLFxuICAgICAgdGhlbWVDb2xvcjogJCgnbWV0YVtuYW1lPVwidGhlbWUtY29sb3JcIl0nKS5hdHRyKCdjb250ZW50JykgfHwgJyMwMDAwMDAnLFxuICAgICAgY2FuRW1iZWQsXG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGRhdGEpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBmZXRjaCBVUkwnXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IG1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiYXhpb3MiLCJjaGVlcmlvIiwiR0VUIiwicmVxIiwidXJsIiwibmV4dFVybCIsInNlYXJjaFBhcmFtcyIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInJlc3BvbnNlIiwiaGVhZGVycyIsIkFjY2VwdCIsInRpbWVvdXQiLCJtYXhSZWRpcmVjdHMiLCIkIiwibG9hZCIsImRhdGEiLCJnZXRNZXRhIiwibmFtZSIsImF0dHIiLCJwYXJzZWRVcmwiLCJVUkwiLCJkb21haW4iLCJob3N0bmFtZSIsInJlcGxhY2UiLCJmYXZpY29uSHJlZiIsImZpcnN0IiwiZmF2aWNvbiIsInN0YXJ0c1dpdGgiLCJwcm90b2NvbCIsInJhd0ltYWdlIiwiaW1hZ2UiLCJ4Zm8iLCJjc3AiLCJjYW5FbWJlZCIsImluY2x1ZGVzIiwidGl0bGUiLCJ0ZXh0IiwidHJpbSIsImRlc2NyaXB0aW9uIiwic2l0ZU5hbWUiLCJ0eXBlIiwidGhlbWVDb2xvciIsImVyciIsIm1lc3NhZ2UiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/og/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fog%2Froute&page=%2Fapi%2Fog%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fog%2Froute.ts&appDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fog%2Froute&page=%2Fapi%2Fog%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fog%2Froute.ts&appDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_beeweb_Documents_Garnik_Playmade_og_scrapper_app_api_og_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/og/route.ts */ \"(rsc)/./app/api/og/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/og/route\",\n        pathname: \"/api/og\",\n        filename: \"route\",\n        bundlePath: \"app/api/og/route\"\n    },\n    resolvedPagePath: \"/Users/beeweb/Documents/Garnik/Playmade/og-scrapper/app/api/og/route.ts\",\n    nextConfigOutput,\n    userland: _Users_beeweb_Documents_Garnik_Playmade_og_scrapper_app_api_og_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZvZyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGb2clMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZvZyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmJlZXdlYiUyRkRvY3VtZW50cyUyRkdhcm5payUyRlBsYXltYWRlJTJGb2ctc2NyYXBwZXIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYmVld2ViJTJGRG9jdW1lbnRzJTJGR2FybmlrJTJGUGxheW1hZGUlMkZvZy1zY3JhcHBlciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDdUI7QUFDcEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9iZWV3ZWIvRG9jdW1lbnRzL0dhcm5pay9QbGF5bWFkZS9vZy1zY3JhcHBlci9hcHAvYXBpL29nL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9vZy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL29nXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9vZy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9iZWV3ZWIvRG9jdW1lbnRzL0dhcm5pay9QbGF5bWFkZS9vZy1zY3JhcHBlci9hcHAvYXBpL29nL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fog%2Froute&page=%2Fapi%2Fog%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fog%2Froute.ts&appDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?4c03":
/*!***********************!*\
  !*** debug (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:console":
/*!*******************************!*\
  !*** external "node:console" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:console");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:dns":
/*!***************************!*\
  !*** external "node:dns" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:dns");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:http2":
/*!*****************************!*\
  !*** external "node:http2" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http2");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:querystring":
/*!***********************************!*\
  !*** external "node:querystring" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:querystring");

/***/ }),

/***/ "node:sqlite":
/*!******************************!*\
  !*** external "node:sqlite" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:sqlite");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:timers":
/*!******************************!*\
  !*** external "node:timers" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:timers");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:util/types":
/*!**********************************!*\
  !*** external "node:util/types" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util/types");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/undici","vendor-chunks/axios","vendor-chunks/iconv-lite","vendor-chunks/parse5","vendor-chunks/cheerio","vendor-chunks/css-select","vendor-chunks/asynckit","vendor-chunks/htmlparser2","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/whatwg-mimetype","vendor-chunks/form-data","vendor-chunks/call-bind-apply-helpers","vendor-chunks/nth-check","vendor-chunks/cheerio-select","vendor-chunks/whatwg-encoding","vendor-chunks/get-proto","vendor-chunks/encoding-sniffer","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/follow-redirects","vendor-chunks/css-what","vendor-chunks/proxy-from-env","vendor-chunks/parse5-parser-stream","vendor-chunks/parse5-htmlparser2-tree-adapter","vendor-chunks/domelementtype","vendor-chunks/safer-buffer","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/delayed-stream","vendor-chunks/combined-stream","vendor-chunks/boolbase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fog%2Froute&page=%2Fapi%2Fog%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fog%2Froute.ts&appDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fbeeweb%2FDocuments%2FGarnik%2FPlaymade%2Fog-scrapper&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();