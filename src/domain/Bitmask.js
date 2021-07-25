export default class Bitmask {
    static decimalToBinary(decimal){
        return (decimal >>> 0).toString(2);
    }
    
    static fromRange (range) {
        if(range === 0) return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

        const initialBitmask = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        const rangeToBits = this.decimalToBinary(Math.pow(2, 32 - range)).split("")
        rangeToBits.shift();
        
        return initialBitmask
            .reverse()
            .map((elm, i) => rangeToBits[i] ? parseInt(rangeToBits[i]) : elm)
            .reverse();
    }

    static splitIntoOctets(bits){
        let iterator = 0;
        let octets = [];
    
        do {
            if(iterator % 8 === 0) octets.push([]);
            octets[octets.length-1].push(bits[iterator]);
            iterator++;
        }while(iterator < bits.length);

        return octets;
    }
}