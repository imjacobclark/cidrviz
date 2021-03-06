import CIDR from './CIDR';
import OutOfBoundError from '../errors/OutOfBoundsError';

const ipv4CIDR = CIDR.ipv4();

const accountForZeroIndexing = addresses => addresses - 1;

describe('CIDR bounds', () => {
    test('32 is the upper bound', () => {
        const attemptOutOfBoundCall = () => ipv4CIDR.availableAddresses(33);
        expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
    });

    test('0 is the lower bound', () => {
        const attemptOutOfBoundCall = () => ipv4CIDR.availableAddresses(-1);
        expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
    });

    test('16 is within valid bounds', () => {
        const attemptOutOfBoundCall = () => ipv4CIDR.availableAddresses(16);
        expect(attemptOutOfBoundCall).not.toThrow(OutOfBoundError);
    });
});

describe('Last octet as host', () => {
    describe('Number of hosts conforms with 2^(32-cidr_range)', () => {
        it.each([
            [32,1],
            [31,2],
            [30,4],
            [29,8],
            [28,16],
            [27,32],
            [26,64],
            [25,128],
            [24,256]
        ])('%s addresses when routing prefix is %i bits', (range, ips) => {
            expect(ipv4CIDR.availableAddresses(range)).toEqual(ips);
        });
    });

    describe('The first usable address', () => {
        test('with a routing prefix of 32 is always the identity function of the given IP', () => {
            expect(ipv4CIDR.firstUsableAddress([192, 168, 1, 0], 32)).toEqual([192, 168, 1, 0]);
            expect(ipv4CIDR.firstUsableAddress([192, 168, 1, 6], 32)).toEqual([192, 168, 1, 6]);
        });

        test('with a routing prefix of 32 and a starting host postfix of 256 is rejected as out of bounds', () => {
            const attemptOutOfBoundCall = () => ipv4CIDR.firstUsableAddress([192, 168, 1, 256], 32);
            expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
        });

        test('with a routing prefix of 32 and a starting host postfix of -256 is rejected as out of bounds', () => {
            const attemptOutOfBoundCall = () => ipv4CIDR.firstUsableAddress([192, 168, 1, -256], 32);
            expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
        });

        it.each([31,30,29,28,27,26,25,24])('with a routing prefix of %i is the identity function of the given IP when within range', range => {
            expect(ipv4CIDR.firstUsableAddress([192, 168, 1, 0], range)).toEqual([192, 168, 1, 0]);
        });

        it.each([31,30,29,28,27,26,25,24])('with a routing prefix of %i and a starting host postfix of 255 is rejected as out of bounds', range => {
            const attemptOutOfBoundCall = () => ipv4CIDR.firstUsableAddress([192, 168, 1, 255], range);
            expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
        });
    });

    describe('The last usable address', () => {
        test('with a routing prefix of 32 is always the identity function of the given IP', () => {
            expect(ipv4CIDR.lastUsableAddress([192, 168, 1, 0], 32)).toEqual([192, 168, 1, 0]);
            expect(ipv4CIDR.lastUsableAddress([192, 168, 1, 6], 32)).toEqual([192, 168, 1, 6]);
        });

        test('with a routing prefix of 32 and a starting host postfix of 256 is rejected as out of bounds', () => {
            const attemptOutOfBoundCall = () => ipv4CIDR.lastUsableAddress([192, 168, 1, 256], 32);
            expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
        });

        test('with a routing prefix of 32 and a starting host postfix of -256 is rejected as out of bounds', () => {
            const attemptOutOfBoundCall = () => ipv4CIDR.lastUsableAddress([192, 168, 1, -256], 32);
            expect(attemptOutOfBoundCall).toThrow(OutOfBoundError);
        });

        test('with a routing prefix of 26 and a starting host postfix of 0 returns 63', () => {
            expect(ipv4CIDR.lastUsableAddress([192, 168, 1, 0], 26)).toEqual([192, 168, 1, 63]);
        });

        it.each([31,30,29,28,27,26,25,24])('with a routing prefix of %i is the identity function of the given IP when within range', range => {
            expect(ipv4CIDR.lastUsableAddress([192, 168, 1, 0], range)).toEqual([192, 168, 1, accountForZeroIndexing(Math.pow(2, (32 - range)))]);
        });
    });
});

describe('Third and Fourth octets as host', () => {
    describe('Number of hosts conforms with 2^(32-cidr_range)', () => {
        it.each([
            [23,512],
            [22,1024],
            [21,2048],
            [20,4096],
            [19,8192],
            [18,16384],
            [17,32768],
            [16,65536]
        ])('%s addresses when routing prefix is %i bits', (range, ips) => {
            expect(ipv4CIDR.availableAddresses(range)).toEqual(ips);
        });
    });

    describe('The first usable address', () => {
        it.each([23,22,21,20,19,18,17,16])('with a routing prefix of %i the fourth octet always starts at 0', range => {
            expect(ipv4CIDR.firstUsableAddress([192, 168, 0, 0], range)).toEqual([192, 168, 0, 0]);
        });
    });
});