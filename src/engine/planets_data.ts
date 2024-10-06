export const planets: TypeObjectData[] = [

    {
        name: 'Mercury',

        texture: '/objects/mercury/Mercury_texture.jpg',
        mesh: '/objects/mercury/Mercury.fbx',
        scale: 0.38,
        //distance: 1
        distance: 0.39,
        speedOrbit: 4.15, 
        speedRotation: 0.00017

    },

    {
        name: 'Venus',

        texture: '/objects/venus/venus_texture.jpg',
        mesh: '/objects/venus/venus.fbx',
        scale: 0.95,
        //distance: 8
        distance: 0.72,
        speedOrbit: 1.62, 
        speedRotation: 0.00007
    },
    {
        name: 'Earth',

        texture: '/objects/earth/Earth_texture.png',
        normal: '/objects/earth/Earth_normal.png',
        mesh: '/objects/earth/Earth.fbx',
        scale: 1,
        // distance: 15
        distance: 1,
        speedOrbit: 1, 
        speedRotation: 0.01
    },
    {
        name: 'Mars',

        texture: '/objects/mars/Mars_texture.jpg',
        mesh: '/objects/mars/Mars.fbx',
        scale: 0.53,
        //distance: 30
        distance: 1.52,
        speedOrbit: 0.53, 
        speedRotation:  0.0097

    },
    {
        name: 'Jupiter',

        texture: '/objects/jupiter/Jupiter_texture.png',
        normal: '/objects/jupiter/Jupiter_normal.png',
        mesh: '/objects/jupiter/Jupiter.fbx',
        scale: 11.2,
        //   distance: 1000
        distance: 5.2,
        speedOrbit: 0.08, 
        speedRotation: 0.24
    },
    {
        name: 'Saturn',

        texture: '/objects/saturn/saturn_texture.jpg',
        mesh: '/objects/saturn/saturn.fbx',
        scale: 9.45,
        // distance: 4000
        distance: 9.58,
        speedOrbit: 0.034, 
        speedRotation: 0.235

    },


    {
        name: 'Uranus',

        texture: '/objects/uranus/uranus_texture.jpg',
        normal: '/objects/uranus/uranus_normal.jpg',
        mesh: '/objects/uranus/uranus.fbx',
        scale: 4.01,
        //distance: 8000
        distance: 19.18,
        speedOrbit: 0.012, 
        speedRotation: 0.059

    },

    {
        name: 'Neptune',

        texture: '/objects/neptune/Neptune_texture.jpg',
        normal: '/objects/neptune/Neptune_normal.jpg',
        mesh: '/objects/neptune/Neptune.fbx',
        scale: 3.88,
        //  distance: 4000
        distance: 30.07,
        speedOrbit: 0.006, 
        speedRotation:  0.0625
    },





]

export const sun: TypeObjectData = {
    name: 'Sun',

    texture: '/objects/sun/sun_texture.jpg',
    mesh: '/objects/sun/sun.fbx',
    // scale: 109, 
    scale: 15, //para ajudar
    distance: 0, 
    speedOrbit:0, 
    speedRotation:0

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
    distance: number, 
    speedOrbit:number
    speedRotation:number

}