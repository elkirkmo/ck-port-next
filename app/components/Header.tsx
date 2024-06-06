type HeaderProps = {
  name: string;
  location: string;
};

const Header = ({ name, location }: HeaderProps) => {
  return (
    <header className="text-right text-black">
      <h1 className="font-size-xl">{name}</h1>
      <h2>Development | Documentary | Digital Filmmaking</h2>
      <h3>Based in {location}</h3>
    </header>
  );
};

export default Header;
