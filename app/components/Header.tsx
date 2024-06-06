type HeaderProps = {
  name: string;
  location: string;
};

const Header = ({ name, location }: HeaderProps) => {
  return (
    <header>
      <h1>{name}</h1>
      <h2>Development | Documentary | Digital Filmmaking</h2>
      <h3>Based in {location}</h3>
    </header>
  );
};

export default Header;
