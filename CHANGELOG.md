<a name="v2.4.0"></a>
## [v2.4.0](https://github.com/alexseitsinger/react-router-components/compare/v2.3.1...v2.4.0) (2019-07-11)

### Code Refactoring
- Caches configs to re-use routes. ([1592083](https://github.com/alexseitsinger/react-router-components/commit/1592083399ca31a0799fd0489e5334fdf911fdd7))
- Saves parentConfigs at runtime. ([3cd1399](https://github.com/alexseitsinger/react-router-components/commit/3cd1399116f183967766715972970ca9ee81dc2c))


<a name="v2.3.1"></a>
## [v2.3.1](https://github.com/alexseitsinger/react-router-components/compare/v2.3.0...v2.3.1) (2019-07-11)

### Bug Fixes
- Moves cached settings outside function. ([5c291a9](https://github.com/alexseitsinger/react-router-components/commit/5c291a98bd08b08627724f9ac88b571cbd8e6b5e))


<a name="v2.3.0"></a>
## [v2.3.0](https://github.com/alexseitsinger/react-router-components/compare/v2.2.3...v2.3.0) (2019-07-11)

### Features
- Shallow compares configs for renders. ([565e954](https://github.com/alexseitsinger/react-router-components/commit/565e95430f17cb65db7f5223a63bfd9567226f70))


<a name="v2.2.3"></a>
## [v2.2.3](https://github.com/alexseitsinger/react-router-components/compare/v2.2.2...v2.2.3) (2019-07-10)

### Code Refactoring
- Fixes `setFullPath`. ([7569756](https://github.com/alexseitsinger/react-router-components/commit/756975601952aa1e82b3dded414023c21cb7f0b5))
- Fixes duplicate paths being added. ([c189f63](https://github.com/alexseitsinger/react-router-components/commit/c189f63c766962b2dc774bce85d31247b493aeb1))

### Features
- Caches generated routes. ([a4273f7](https://github.com/alexseitsinger/react-router-components/commit/a4273f76f938fcda595ce14e8ed2b40df26f19a2))


<a name="v2.2.2"></a>
## [v2.2.2](https://github.com/alexseitsinger/react-router-components/compare/v2.2.1...v2.2.2) (2019-07-10)

### Code Refactoring
- Removes path combining. ([a46163b](https://github.com/alexseitsinger/react-router-components/commit/a46163b56e8ea07506b899668466eb3f023f7ceb))
- Str concat to template literal. ([08bf751](https://github.com/alexseitsinger/react-router-components/commit/08bf7515e89dc5f572216810d30af0bbaf2e5f46))

### Features
- Adds `setFullPath` method. ([fc27322](https://github.com/alexseitsinger/react-router-components/commit/fc273227ad9f0cc4bedb6988327828f204b920b5))
- Adds utils to `createRouteComponent`. ([ace8d72](https://github.com/alexseitsinger/react-router-components/commit/ace8d72889c613f87cce8b3c7aa76f10f187c311))


<a name="v2.2.1"></a>
## [v2.2.1](https://github.com/alexseitsinger/react-router-components/compare/v2.2.0...v2.2.1) (2019-07-09)

### Bug Fixes
- Adds callback for reports. ([00d6fd7](https://github.com/alexseitsinger/react-router-components/commit/00d6fd7a7fa1dbb728caa66472c399ec1c37b90e))


<a name="v2.2.0"></a>
## [v2.2.0](https://github.com/alexseitsinger/react-router-components/compare/v2.1.0...v2.2.0) (2019-07-09)

### Features
- Moves reportRoutes to own module. ([c574af6](https://github.com/alexseitsinger/react-router-components/commit/c574af688297c430108b5523edbb3fba6f11f5f3))


<a name="v2.1.0"></a>
## [v2.1.0](https://github.com/alexseitsinger/react-router-components/compare/v2.0.0...v2.1.0) (2019-07-09)

### Bug Fixes
- Fixes export statement. ([b6ff59c](https://github.com/alexseitsinger/react-router-components/commit/b6ff59ce36c97c316a65568a60edf58731540765))

### Code Refactoring
- Changes console message heading. ([d586601](https://github.com/alexseitsinger/react-router-components/commit/d586601b6cb313182bca03c5f4f8b48b74c1560a))

### Features
- Adds `createRouteComponent`. ([c241676](https://github.com/alexseitsinger/react-router-components/commit/c2416763cb194abc464d1c6740844c73d175d457))


<a name="v2.0.0"></a>
## [v2.0.0](https://github.com/alexseitsinger/react-router-components/compare/v1.0.0...v2.0.0) (2019-07-09)

### Bug Fixes
- Adds missing key arg for `getStateValue`. ([9cc892d](https://github.com/alexseitsinger/react-router-components/commit/9cc892d21f57b5a61ffeb55ae433af2fb4e813fc))
- Fixes export statement. ([318c678](https://github.com/alexseitsinger/react-router-components/commit/318c678d558368869a55d6e398f45dd2a5b7d63f))

### Code Refactoring
- Updates args. ([1458648](https://github.com/alexseitsinger/react-router-components/commit/1458648c78e1f45c54d488c40a0361a14ba0e095))
- Uses getStateValue from utils. ([d5e3848](https://github.com/alexseitsinger/react-router-components/commit/d5e3848a69a5f1c6d738bf8ea7854f92d00e8007))

### Features
- Adds `createRedirectedComponent` module. ([439cfde](https://github.com/alexseitsinger/react-router-components/commit/439cfdefbedbcdb42ca2828fd0198cab5126ca99))
- Moves `getStateValue` to utils module. ([93586a6](https://github.com/alexseitsinger/react-router-components/commit/93586a6c436e23461bf7a90e59ad56035f4d2623))


<a name="v1.0.0"></a>
## [v1.0.0](https://github.com/alexseitsinger/react-router-components/compare/v0.1.0...v1.0.0) (2019-06-25)

### Code Refactoring
- Changes reducer obj to state str. ([24f58a7](https://github.com/alexseitsinger/react-router-components/commit/24f58a77030a2f3b6f9988319c482be9441a58c2))


<a name="v0.1.0"></a>
## [v0.1.0](https://github.com/alexseitsinger/react-router-components/compare/fdf10e09c88d07d78d48ad8edc78e5f9a2b8c4c8...v0.1.0) (2019-06-02)

### Bug Fixes
- Adds missing check in if statement. ([e687170](https://github.com/alexseitsinger/react-router-components/commit/e6871700cddf4afa4fbc9701a00826648465a513))
- Capitalizes component names. ([d82f380](https://github.com/alexseitsinger/react-router-components/commit/d82f380eef51ec2766de8e5e5f8100300175f4c2))

### Code Refactoring
- Returns from the connect command. ([6b801f2](https://github.com/alexseitsinger/react-router-components/commit/6b801f2245ca68edbafdafcd5f396d1a42ca356f))

### Features
- Adds new module to main exports. ([d73876c](https://github.com/alexseitsinger/react-router-components/commit/d73876c11516351e00818cf480fbed6f6f0c784e))


