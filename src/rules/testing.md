# Testing

## Test Pyramid
```
       E2E        (few, slow)
    Integration   (some, medium)
  Unit Tests      (many, fast)
```

## Coverage
Minimum 80%

## Types
**Unit**: Individual functions in isolation
**Integration**: Component interactions
**E2E**: Complete user flows

## Naming
```
test('<what> <expected behavior>', () => {})
```

## Location
Near code: `src/users/user.service.test.ts`
Or separate: `tests/users/user.service.test.ts`

## Running
```bash
npm test              # All
npm test -- --watch   # Watch
npm test -- --coverage
```

## CI/CD
Unit: Every commit
Integration: Every PR
E2E: Before deploy

## Mocks
```javascript
jest.mock('./service');
test('calls service', async () => {
  await fn();
  expect(service.call).toHaveBeenCalled();
});
```
