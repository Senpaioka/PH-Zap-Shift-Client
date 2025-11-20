import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { useRef } from 'react';



function Coverage() {

  const warehouse = useLoaderData();
  const mapRef = useRef(null);
  const position = [23.6850, 90.3563];


  const handleSearch = e => {
        e.preventDefault();
        const location = e.target.location.value;
       
        const district = warehouse.find(c => c.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude];
            // console.log(district, coord)
            // go to the location
            mapRef.current.flyTo(coord, 14);
        }
    }

  return (

     <div className="w-11/12 mx-auto bg-white p-10 rounded-xl">

       <h3 className="font-u-extra text-5xl">We are available in 64 districts</h3>

       <form onSubmit={handleSearch} className="mt-[50px] space-x-1">
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" name="location" required placeholder="Search" />
        </label>
        <button className="btn bg-primary font-u-bold text-base">Search</button>
       </form>


      {/* divider  */}
      <div className="mt-[50px]">
        <span className="divider"></span>
      </div>

      {/* map  */}

      <div>
        <h3 className="font-u-extra text-3xl py-5">We deliver almost all over Bangladesh</h3>


        <div className='border border-gray-300 w-full h-[400px] mt-[30px]'>
          <MapContainer center={position} zoom={8} scrollWheelZoom={false} className='h-[400px]' ref={mapRef}>

            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={['mt0','mt1','mt2','mt3']}
            />

            {
              warehouse.map((collection_point, index) => 
              <Marker position={[collection_point.latitude, collection_point.longitude]} key={index}>
                <Popup>
                  <strong>{collection_point.district}</strong> <br /> Service Area: {collection_point.covered_area.join(', ')}.
                </Popup>
              </Marker>)
            }

          </MapContainer>
        </div>

      </div>

     </div>
  );
}

export default Coverage;

