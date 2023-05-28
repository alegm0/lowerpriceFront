import Home from '../../assets/img/navbar/home-icon.svg';
import Balanza from '../../assets/img/navbar/balanza-icon.svg';
import Wishlist from '../../assets/img/navbar/wishlist-icon.svg';
import Market from '../../assets/img/navbar/market-icon.svg';
import Profile from '../../assets/img/navbar/profile-icon.svg';
import Map from '../../assets/img/navbar/map-icon.svg';
import Salir from '../../assets/img/navbar/Salir.svg';
import Facebook from '../../assets/img/navbar/facebook-icon.svg';
import Instagram from '../../assets/img/navbar/instagram-icon.svg';
import Twitter from '../../assets/img/navbar/twitter-icon.svg';
import support from '../../assets/img/soporte.png';
export { default } from './NavbarVertical';

export const Routes = [
    {
        title: 'Inicio',
        icon: Home,
        alt: 'icon-home',
        url: '/home',
    },
    {
        title: 'Comparar',
        icon: Balanza,
        alt: 'icon-balanza',
        url: '/comparison-list',
    },
    {
        title: 'Lista deseos',
        icon: Wishlist,
        alt: 'icon-list',
        url: '/shopping-list',
    },
    {
        title: 'Productos',
        icon: Market,
        alt: 'icon-products',
        url: '/my-products',
    },
    {
        title: 'Perfil',
        icon: Profile,
        alt: 'icon-profile',
        url: localStorage.getItem('role') === '1' ? '/profile-clients' : '/profile-company',
    },
    {
        title: 'Mapa',
        icon: Map,
        alt: 'icon-map',
        url: '/maps',
    },
    {
        title: 'cerrar sesion',
        icon: Salir,
        alt: 'icono-salir',
        url: '',
    }
];

export const RedSocials = [
    {
        icon: Facebook,
        alt: 'icon-facebook',
        link: 'https://facebook.com'
    },
    {
        icon: Instagram,
        alt: 'icon-instagram',
        link: 'https://instagram.com'
    },
    {
        icon: Twitter,
        alt: 'icon-twitter',
        link: 'https://twitter.com'
    },
    {
        icon: support,
        alt: 'icon-support',
        link: '/technical_support'
    }
];
