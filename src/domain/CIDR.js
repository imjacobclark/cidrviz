import OutOfBoundError from '../errors/OutOfBoundsError';

export default class CIDR {
    static ipv4(){
        const CIDR_RANGE_UPPER_BOUND = 32;
        const CIDR_RANGE_LOWER_BOUND = 0;

        const OCTET_UPPER_BOUND = 255;
        const OCTET_LOWER_BOUND = 0;

        return {
            availableAddresses: range => {
                if(range > CIDR_RANGE_UPPER_BOUND || range < CIDR_RANGE_LOWER_BOUND){
                    throw new OutOfBoundError(`CIDR range must be between ${CIDR_RANGE_LOWER_BOUND} and ${CIDR_RANGE_UPPER_BOUND}`);
                }

                return Math.pow(2, (CIDR_RANGE_UPPER_BOUND - range));
            },
            firstUsableAddress: (ip, range) => {
                if(ip[3] > 255 || ip[3] < 0) throw new OutOfBoundError(`Octet excees  ${OCTET_LOWER_BOUND} and ${OCTET_UPPER_BOUND}`);

                return ip;
            }
        }
    }
}