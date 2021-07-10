import OutOfBoundError from '../errors/OutOfBoundsError';


const CIDR_RANGE_UPPER_BOUND = 32;
const CIDR_RANGE_LOWER_BOUND = 0;

const OCTET_UPPER_BOUND = 255;
const OCTET_LOWER_BOUND = 0;

const OUT_OF_BOUND_ERROR_MESSAGE_CIDR = `CIDR range must be between ${CIDR_RANGE_LOWER_BOUND} and ${CIDR_RANGE_UPPER_BOUND}`;
const OUT_OF_BOUND_ERROR_MESSAGE_OCTET = `Octet exceeds ${OCTET_LOWER_BOUND} and ${OCTET_UPPER_BOUND}. This is an invalid IP block.`;

const accountForZeroIndexing = addresses => addresses - 1;

const availableAddresses = range => {
    if(range > CIDR_RANGE_UPPER_BOUND || range < CIDR_RANGE_LOWER_BOUND){
        throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_CIDR);
    }

    return Math.pow(2, (CIDR_RANGE_UPPER_BOUND - range));
}

const firstUsableAddress = (ip, range) => {
    const lastOctet = ip[3];
    const numberOfPossibleAddresses = availableAddresses(range);

    const octetExceedsUpperBound = lastOctet > OCTET_UPPER_BOUND;
    const octetExceedsLowerBound = lastOctet < OCTET_LOWER_BOUND;
    const octetRangeExceedsUpperBound = accountForZeroIndexing(lastOctet + numberOfPossibleAddresses) > OCTET_UPPER_BOUND;

    if(octetExceedsLowerBound || octetExceedsUpperBound || octetRangeExceedsUpperBound) 
        throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_OCTET);
    
    return ip;
}

export default class CIDR {
    static ipv4(){
        return {
            availableAddresses,
            firstUsableAddress
        }
    }
}