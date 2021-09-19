import AssessmentIcon from '@material-ui/icons/Assessment';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {Role} from '../models/Role';

const menus = [
    {
        id: 'Menu personal',
        children: [
            {id: "Dashboard", icon: <AssessmentIcon/>, link: "/"},
            {
                id: "Mis Citas",
                icon: <EventIcon/>,
                link: "/mis-citas",
                /*tabs: [
                    {title: "Calendario", link: "/mis-citas"},
                    {title: "Agendar cita", link: "/mis-citas/agendar"}
                ]*/
            },
            {id: "Mis Pacientes", icon: <PeopleIcon/>, link: "/mis-pacientes"},
            {id: "Inventario", icon: <LayersIcon/>, link: "/inventario"},
        ],
    },
    {
        id: "Administración",
        roles: [Role.Admin],
        children: [
            {id: "Dashboard admin", icon: <SupervisedUserCircleIcon/>, link: "/admin"},
            {id: "Calendario", icon: <EventIcon/>, link: "/admin/calendario"},
            {id: "Usuarios", icon: <SupervisedUserCircleIcon/>, link: "/admin/usuarios"},
        ]
    }
];

const extraPaths = [
    {
        title: "Perfil Paciente", link: "/pacientes/:id",
        tabs: [
            {title: "Datos personales", link: "/pacientes/:id"},
            {
                title: "Ficha clínica",
                link: "/pacientes/:id/ficha-clinica",
                tabs: [
                    {title: "Evoluciones", link: "/pacientes/:id/ficha-clinica/evoluciones"},
                    {title: "Radiografias", link: "/pacientes/:id/ficha-clinica/radiografias"}
                ]
            },
            {title: "Planes de tratamiento", link: "/pacientes/:id/planes-tratamiento"}
        ]
    },
    {
        title: "Mi Perfil", link: "/mi-perfil"
    }
]

const filterPath = (menu, path) => {
    const link = menu.link;
    return ((link === path) || (link.includes(':id') && (path.startsWith(link.replace(':id', '')))) || (menu?.tabs?.find(tab => tab.link === path))
    )
};

export const getPageProps = (currentLink) => (
    menus
        .map(menu => menu.children)
        .reduce((prev, current) => [...prev, ...current])
        .map((e, i) => ({title: e.id, link: e.link, tabs: e.tabs}))
        .concat(extraPaths)
        .find((menu) => filterPath(menu, currentLink))
);

export default menus;