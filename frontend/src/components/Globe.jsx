import { useRef, useEffect } from 'react'
import GlobeGL from 'react-globe.gl'

function Globe() {
  const globeRef = useRef()

  const points = [
    { lat: 30.9010, lng: 75.8573, city: 'Ludhiana', risk: 'High', color: '#ef4444' },
    { lat: 31.2240, lng: 75.7708, city: 'Phagwara', risk: 'Medium', color: '#eab308' },
    { lat: 31.3260, lng: 75.5762, city: 'Jalandhar', risk: 'Low', color: '#3b82f6' },
  ]

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.6
      globeRef.current.pointOfView({ lat: 31, lng: 75, altitude: 1.8 })
    }
  }, [])

  return (
    <div className="w-full h-80 sm:h-96 flex items-center justify-center">
      <GlobeGL
        ref={globeRef}
        width={340}
        height={340}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.02}
        pointRadius={0.4}
        pointLabel="city"
      />
    </div>
  )
}

export default Globe