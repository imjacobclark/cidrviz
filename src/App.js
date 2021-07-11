import CIDR from './domain/CIDR';

function App() {
  const ipv4CIDR = CIDR.ipv4();

  return (
    <div>
      <h1>CIDRViz</h1>

      <p>A resource for understanding and calculating IPv4 and IPv6 addresses and CIDR blocks.</p>
      <p>Calculate ranges, divide and join blocks, generate random IPs within a block and save your CIDR configs for later.</p>

      <hr />

      <h2>Understand CIDR and IPv4</h2>
      <p>The basic unit when working with IPs is the <i>bit</i>, a <i>bit</i> represents true or false (on or off), it is represented as either a 0 for false or 1 for true.</p>
      <p>We call the number system that uses just 0 and 1 binary. Or the base-2 number system. Each digit is referred to as a bit, like we mentioned above.</p>
      <p>You're probably used to seeing IPs in decimal (numbers that humans count with) form, otherwise known as base-10. An IP such as 129.168.2.1 is an example of such an address. You might recognise this address from changing the password on your WiFi router, more on this later. In reality, IPs are shown in decimal to help humans, but underneath IPs are actually just collections of bits. 32 of them to be precise.</p>
      <p>As set out in the IPv4 spec, we split IPv4 addresses up into octets (eight 0 and 1s, or eight bits), of which there are 4 groups. This means there are a finite number of addresses within the IPv4 address space, as no further groups can be added and the number of bits in each group are fixed.</p>
      <p>To be precise, on any particular network, there are exactly 4,294,967,296 IPv4 addresses available. This is likely not a problem for a private network, but the explosion of devices with public internet connections has resulted in us exhausting almost all IPv4 addresses. The newer IPv6 spec fixes this problem, however IPv4 is still widely used.</p>
      <p>If we take 192.168.2.1 as an example, the first octet would be 192, the second being 168, the third 2 and the fourth 1. When we see 4 groups of numbers representing an IP with a dot seperating each, we call this a dotted decimal notation.</p>
      <p>Lets turn 192.168.2.1 into its true form. The binary representation of this address is actually 1100 0000 1010 1000 0000 0010 0000 0001.</p>

      <hr /> 

      <h3><code>192.168.1.0/32</code></h3>
      <p><strong>Number of addresses</strong>: <code>{ipv4CIDR.availableAddresses(32)}</code></p>
      <p><strong>First avaliable address</strong>: <code>{ipv4CIDR.firstUsableAddress([192, 168, 1, 0], 32).join(".")}</code></p>
      <p><strong>Last avaliable address</strong>: <code>{ipv4CIDR.lastUsableAddress([192, 168, 1, 0], 32).join(".")}</code></p>

      <hr />

      <h3><code>192.168.1.0/26</code></h3>
      <p><strong>Number of addresses</strong>: <code>{ipv4CIDR.availableAddresses(26)}</code></p>
      <p><strong>First avaliable address</strong>: <code>{ipv4CIDR.firstUsableAddress([192, 168, 1, 0], 26).join(".")}</code></p>
      <p><strong>Last avaliable address</strong>: <code>{ipv4CIDR.lastUsableAddress([192, 168, 1, 0], 26).join(".")}</code></p>

      <hr />
    </div>
  );
}

export default App;
