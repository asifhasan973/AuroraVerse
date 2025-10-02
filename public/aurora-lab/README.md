# Aurora Lab

An interactive 3D aurora simulation that allows users to create custom auroras by adjusting solar wind parameters.

## Features

- **Interactive 3D Visualization**: Real-time 3D rendering of Earth, magnetosphere, and aurora effects
- **Solar Wind Controls**: Adjust wind speed, density, and IMF Bz parameters
- **Multiple Views**: Switch between space view and ground views (North/South pole)
- **Real-time Data**: Option to use real-time solar wind data
- **Custom Aurora Creation**: Create beautiful aurora displays with different parameters

## Controls

### Solar Wind Parameters
- **Speed**: Controls the velocity of solar wind particles (300-1200 km/s)
- **Density**: Particle density of the solar wind (1-50 particles/cm³)
- **IMF Bz**: Interplanetary Magnetic Field Z-component (-20 to 5 nT)

### Emission Settings
- **Interval**: Time between automatic solar wind emissions (0-20 seconds)

### View Options
- **Space View**: Overview of Earth and magnetosphere from space
- **Ground View**: Aurora view from Earth's surface (North/South pole)

## Technical Details

- Built with Three.js for 3D rendering
- Uses WebGL shaders for aurora effects
- Integrates with NASA DONKI API for real-time space weather data
- Responsive design with collapsible control panel

## Usage

1. Navigate to the Aurora Lab page
2. Use the control panel to adjust solar wind parameters
3. Click on the Sun to manually trigger solar wind emissions
4. Switch between different views using the view buttons
5. Enable real-time mode to use actual space weather data

## Files Structure

- `scripts/`: JavaScript modules for 3D rendering and controls
- `styles/`: CSS files for UI styling
- `assets/`: Texture files and images
