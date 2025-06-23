import '@testing-library/jest-native/extend-expect';


jest.mock("react-native-vector-icons/Feather", () => () => { });
jest.mock('react-native-linear-gradient', () => {
    const LinearGradient = ({ children, ...rest }) => (
        <div {...rest}>
            {children}
        </div>
    );
    return LinearGradient;
});
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({ navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() }),
    };
});
jest.mock('@react-navigation/native', () => require('./__mocks__/react-navigation'));
jest.mock('@react-navigation/bottom-tabs', () => require('./__mocks__/react-navigation'));
jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
    hide: jest.fn(),
    Toast: () => null,
    default: {
      show: jest.fn(),
      hide: jest.fn(),
    },
  };
});
global.alert = jest.fn();



