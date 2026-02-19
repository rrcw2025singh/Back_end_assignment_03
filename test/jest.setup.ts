// Always mock firestore in every test
jest.mock("../src/config/firebaseConfig", () => ({
    db: {
        collection: jest.fn(),
        runTransaction: jest.fn(),
        batch: jest.fn(),
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetModules();
});
