// NavButton.jsx (مثال للتشغيل)
import CardNav from './../tools/CardNav/CardNav';

const NavButton = () => {
  const items = [
    { label: 'Home' },
    { label: 'Works' },
    { label: 'About' },
    { label: 'Contact' }
  ];

  return (
    <CardNav
      items={items}
      baseColor="#0b0b0b"
    />
  );
};
export default NavButton;
