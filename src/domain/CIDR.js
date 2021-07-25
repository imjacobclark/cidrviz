import OutOfBoundError from '../errors/OutOfBoundsError';
import Bitmask from './Bitmask';

const CIDR_RANGE_UPPER_BOUND = 32;
const CIDR_RANGE_LOWER_BOUND = 0;

const OCTET_UPPER_BOUND = 255;
const OCTET_LOWER_BOUND = 0;

const OUT_OF_BOUND_ERROR_MESSAGE_CIDR = `CIDR range must be between ${CIDR_RANGE_LOWER_BOUND} and ${CIDR_RANGE_UPPER_BOUND}`;
const OUT_OF_BOUND_ERROR_MESSAGE_OCTET = `Octet exceeds ${OCTET_LOWER_BOUND} and ${OCTET_UPPER_BOUND}. This is an invalid IP block.`;

const accountForZeroIndexing = addresses => addresses - 1;

const availableAddressesFromNumberBits = bits => Math.pow(2, bits);

const availableAddresses = range => {
    if(range > CIDR_RANGE_UPPER_BOUND || range < CIDR_RANGE_LOWER_BOUND){
        throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_CIDR);
    }

    return availableAddressesFromNumberBits(CIDR_RANGE_UPPER_BOUND - range);
}

const octetIsWithinRange = (octet, numberOfAddresses) => {
    const octetExceedsUpperBound = octet > OCTET_UPPER_BOUND;
    const octetExceedsLowerBound = octet < OCTET_LOWER_BOUND;
    const octetRangeExceedsUpperBound = accountForZeroIndexing(octet + numberOfAddresses) > OCTET_UPPER_BOUND;

    return octetExceedsLowerBound || octetExceedsUpperBound || octetRangeExceedsUpperBound;
}

const firstUsableAddress = (ip, range) => {
    if(range === 32){
        const lastOctet = ip[3];
        const numberOfPossibleAddresses = availableAddresses(32);
    
        if(octetIsWithinRange(lastOctet, numberOfPossibleAddresses)) 
            throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_OCTET);
    
        return ip;
    }

    const octets = Bitmask.splitIntoOctets(Bitmask.fromRange(range));
    return octets.map(octet => octet.find(bit => bit === 0)).map((octet, i) => {
        if(octet === undefined) {
            return ip[i];
        }else{
            const numberOfPossibleAddresses = availableAddressesFromNumberBits(octets[i].filter(octet => octet === 0).length);

            if(octetIsWithinRange(ip[i], numberOfPossibleAddresses)) 
                throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_OCTET);

            return ip[i];
        }
    });
}


const lastUsableAddress = (ip, range) => {
    if(range === 32){
        const lastOctet = ip[3];
        const numberOfPossibleAddresses = availableAddresses(32);
    
        if(octetIsWithinRange(lastOctet, numberOfPossibleAddresses)) 
            throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_OCTET);
    
        ip[3] = accountForZeroIndexing(lastOctet + numberOfPossibleAddresses);

        return ip;
    }

    const octets = Bitmask.splitIntoOctets(Bitmask.fromRange(range));
    return octets.map(octet => octet.find(bit => bit === 0)).map((octet, i) => {
        if(octet === undefined) {
            return ip[i];
        }else{
            const numberOfPossibleAddresses = availableAddressesFromNumberBits(octets[i].filter(octet => octet === 0).length);

            if(octetIsWithinRange(ip[i], numberOfPossibleAddresses)) 
                throw new OutOfBoundError(OUT_OF_BOUND_ERROR_MESSAGE_OCTET);

            ip[i] = accountForZeroIndexing(ip[i] + numberOfPossibleAddresses);

            return ip[i];
        }
    });
}

export default class CIDR {
    static ipv4(){
        return {
            availableAddresses,
            firstUsableAddress,
            lastUsableAddress
        }
    }
}