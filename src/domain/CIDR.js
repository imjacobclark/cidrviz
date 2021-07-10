import OutOfBoundError from '../errors/OutOfBoundsError';

const UPPER_BOUND = 32;
const LOWER_BOUND = 0;

export default class CIDR {
    static ipv4(){
        return {
            availableAddresses: range => {
                if(range > UPPER_BOUND || range < LOWER_BOUND){
                    throw new OutOfBoundError(`CIDR range must be between ${LOWER_BOUND} and ${UPPER_BOUND}`)
                }

                return Math.pow(2, (UPPER_BOUND - range));
            },
            firstUsableAddress: (ip, range) => {
                return ip;
            }
        }
    }
}