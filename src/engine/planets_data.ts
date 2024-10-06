export const planets: TypeObjectData[] = [

    {
        name: 'Mercury',

        texture: '/objects/mercury/Mercury_texture.jpg',
        mesh: '/objects/mercury/Mercury.fbx',
        scale: 0.38,
        mass: 0.055,
        //distance: 1
        distance: 0.39,
        speedOrbit: 4.15, 
        speedRotation: 0.00017, 
        color: '#BEBEBE', 
        description: 'The closest planet to the Sun, Mercury is a small, rocky world with extreme temperature fluctuations due to its thin atmosphere. Its surface is covered in craters, much like the Moon.'


    },

    {
        name: 'Venus',

        texture: '/objects/venus/venus_texture.jpg',
        mesh: '/objects/venus/venus.fbx',
        scale: 0.94,
        mass: 0.815,
        //distance: 8
        distance: 0.72,
        speedOrbit: 1.62, 
        speedRotation: 0.00007,
        color: '#CB9053', 
        description: 'Venus is the second planet from the Sun and is often called Earth’s "sister planet" due to its similar size. However, Venus has a thick atmosphere of carbon dioxide, resulting in a runaway greenhouse effect that makes it the hottest planet in the Solar System.'
    },
    {
        name: 'Earth',

        texture: '/objects/earth/Earth_texture.png',
        normal: '/objects/earth/Earth_normal.png',
        mesh: '/objects/earth/Earth.fbx',
        scale: 1,
        mass:1, 
        // distance: 15
        distance: 1,
        speedOrbit: 1, 
        speedRotation: 0.01,
        color: '#40455F', 
        description: 'The third planet from the Sun and the only known planet to support life, Earth has a breathable atmosphere and liquid water, making it unique. It has a moderate climate due to its atmosphere and distance from the Sun.'
    },
    {
        name: 'Mars',

        texture: '/objects/mars/Mars_texture.jpg',
        mesh: '/objects/mars/Mars.fbx',
        scale: 0.53,
        mass: 0.107,
        //distance: 30
        distance: 1.52,
        speedOrbit: 0.53, 
        speedRotation:  0.0097, 
        color: '#C28B76', 
        description: 'The fourth planet from the Sun, Mars is known as the Red Planet because of its iron oxide-rich surface. It has polar ice caps, the tallest volcano in the Solar System (Olympus Mons), and signs of ancient water flow.'

    },
    {
        name: 'Jupiter',

        texture: '/objects/jupiter/Jupiter_texture.png',
        normal: '/objects/jupiter/Jupiter_normal.png',
        mesh: '/objects/jupiter/Jupiter.fbx',
        scale: 10.97,
        mass: 318,
        //   distance: 1000
        distance: 5.2,
        speedOrbit: 0.08, 
        speedRotation: 0.24, 
        color: '#F4C0A8', 
        description: 'The fifth and largest planet, Jupiter is a gas giant composed mostly of hydrogen and helium. It has the most massive and powerful storms in the Solar System, including the Great Red Spot, a storm that has raged for centuries.'
    },
    {
        name: 'Saturn',

        texture: '/objects/saturn/saturn_texture.jpg',
        mesh: '/objects/saturn/saturn.fbx',
        scale: 9.13,
        mass: 95,
        // distance: 4000
        distance: 9.58,
        speedOrbit: 0.034, 
        speedRotation: 0.235, 
        color: '#DFCDAF', 
        description: 'Known for its stunning ring system, Saturn is the second-largest planet and also a gas giant. Its rings are made of ice and rock particles, and it has numerous moons, including the large moon Titan.'

    },


    {
        name: 'Uranus',

        texture: '/objects/uranus/uranus_texture.jpg',
        normal: '/objects/uranus/uranus_normal.jpg',
        mesh: '/objects/uranus/uranus.fbx',
        scale: 3.98,
        mass: 14.5,
        //distance: 8000
        distance: 19.18,
        speedOrbit: 0.012, 
        speedRotation: 0.059,
        color: '#ABF2F6', 
        description:'The seventh planet from the Sun, Uranus is an ice giant with a blue-green color due to methane in its atmosphere. Uniquely, it rotates on its side, which results in extreme seasons.'

    },

    {
        name: 'Neptune',

        texture: '/objects/neptune/Neptune_texture.jpg',
        normal: '/objects/neptune/Neptune_normal.jpg',
        mesh: '/objects/neptune/Neptune.fbx',
        scale: 3.86,
        mass:  17.1, 
        //  distance: 4000
        distance: 30.07,
        speedOrbit: 0.006, 
        speedRotation:  0.0625
        ,color: '#646EBC', 
        description: 'The eighth and farthest planet from the Sun, Neptune is also an ice giant. It has strong winds and storms, including the Great Dark Spot, and appears blue due to methane in its atmosphere.'
    },





]

export const sun: TypeObjectData = {
    name: 'Sun',

    texture: '/objects/sun/sun_texture.jpg',
    mesh: '/objects/sun/sun.fbx',
    scale: 109.29, 
    mass: 333000,
    //scale: 15, //para ajudar
    distance: 0, 
    speedOrbit:0, 
    speedRotation:0, 
    color: '#F89E01', 
    description: 'The Sun is a massive, glowing ball of gas at the center of the Solar System. It provides the light and heat that sustains life on Earth and influences the orbits of all planets. It is a G-type main-sequence star composed mostly of hydrogen and helium.'

};

export const objects = [
    sun,
    ...planets
]


export interface TypeObjectData {
    name: string,

    texture: string,
    normal?: string,
    bump?: string
    mesh: string,
    scale: number,
    mass:number,
    distance: number, 
    speedOrbit:number
    speedRotation:number,
    color:string, 
    description:string

}