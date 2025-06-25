import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  AdvancedMarkerProps,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  CollisionBehavior
} from '@vis.gl/react-google-maps';

import { getData } from './data';
import ControlPanel from './control-panel';
import './style.css';

// Color mapping for each store name or type group
const storeColors: Record<string, string> = {
  'Food 4 Less': '#e63946',
  'R-N Market': '#f1faee',
  'Walmart Supercenter': '#457b9d',
  'Save Mart': '#a8dadc',
  'Foodmaxx': '#ffb703',
  'Vallarta Supermarkets': '#2a9d8f',
  'Walmart Neighborhood Market': '#1d3557',
  'Best Buy Market IGA': '#6a4c93',
  'Grocery Outlet': '#d62828',
  'WinCo Foods': '#f77f00',
  'Costco Wholesale': '#0077b6',
  'Sprouts Farmers Market': '#90be6d',
  'La Estrella Market #2': '#fb8500',
  'El Mercado & Discount Center': '#023047',
  "Trader Joe's": '#ff5400',
  'Vons': '#3d5a80',
  "Raley's": '#ff006e',
  'Cardenas Markets': '#8338ec',
  'Smart & Final': '#ffb703',
};

// Helper to get color by store name (matches partial name)
function getColorByStore(name: string): string {
  for (const key of Object.keys(storeColors)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return storeColors[key];
    }
  }
  return '#6c757d'; // fallback gray
}

// Extended MarkerItem type with `name` to access color and info easily
export type MarkerItem = {
  id: string;
  name: string;
  address: string;
  position: google.maps.LatLngLiteral;
  type: 'pin' | 'html';
  zIndex: number;
};

const data = getData()
  .sort((a, b) => b.position.lat - a.position.lat)
  .map((dataItem, index) => ({ ...dataItem, zIndex: index }));

const Z_INDEX_SELECTED = data.length;
const Z_INDEX_HOVER = data.length + 1;

const API_KEY =
  globalThis.PUBLIC_GOOGLE_MAPS_API_KEY ?? (process.env.PUBLIC_GOOGLE_MAPS_API_KEY as string);

const App = () => {
  const [markers] = useState<MarkerItem[]>(data);

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [anchorPoint, setAnchorPoint] = useState('BOTTOM' as keyof typeof AdvancedMarkerAnchorPoint);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);

  // On marker click, set selected ID and position to show InfoWindow
  const onMarkerClick = useCallback(
    (id: string | null, position: google.maps.LatLngLiteral) => {
      setSelectedId(id);
      setSelectedMarker(position);

      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((isShown) => !isShown);
      }
    },
    [selectedId]
  );

  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

  return (
    <APIProvider apiKey={API_KEY} libraries={['marker']}>
      <Map
        mapId={process.env.PUBLIC_MAP_ID}
        defaultZoom={12}
        defaultCenter={{ lat: 36.33, lng: -119.28 }} // central CA approx
        gestureHandling={'greedy'}
        onClick={onMapClick}
        clickableIcons={false}
        disableDefaultUI
      >
        {markers.map(({ id, zIndex: zIndexDefault, position, type, name }) => {
          let zIndex = zIndexDefault;

          if (hoverId === id) {
            zIndex = Z_INDEX_HOVER;
          }

          if (selectedId === id) {
            zIndex = Z_INDEX_SELECTED;
          }

          const color = getColorByStore(name);

          if (type === 'pin') {
            return (
              <AdvancedMarkerWithRef
                key={id}
                position={position}
                zIndex={zIndex}
                className="custom-marker"
                style={{
                  transform: `scale(${[hoverId, selectedId].includes(id) ? 1.3 : 1})`,
                  transformOrigin: AdvancedMarkerAnchorPoint['BOTTOM'].join(' '),
                  cursor: 'pointer',
                }}
                onMarkerClick={() => onMarkerClick(id, position)}
                onMouseEnter={() => onMouseEnter(id)}
                onMouseLeave={onMouseLeave}
              >
                <Pin
                  background={color}
                  borderColor="#333"
                  glyphColor="#fff"
                />
              </AdvancedMarkerWithRef>
            );
          }

          if (type === 'html') {
            return (
              <React.Fragment key={id}>
                <AdvancedMarkerWithRef
                  position={position}
                  zIndex={zIndex}
                  anchorPoint={AdvancedMarkerAnchorPoint[anchorPoint]}
                  className="custom-marker"
                  style={{
                    transform: `scale(${[hoverId, selectedId].includes(id) ? 1.3 : 1})`,
                    transformOrigin: AdvancedMarkerAnchorPoint[anchorPoint].join(' '),
                    cursor: 'pointer',
                  }}
                  onMarkerClick={() => onMarkerClick(id, position)}
                  onMouseEnter={() => onMouseEnter(id)}
                  collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
                  onMouseLeave={onMouseLeave}
                >
                  <div
                    className={`custom-html-content ${selectedId === id ? 'selected' : ''}`}
                    style={{ 
                      backgroundColor: color,
                      borderRadius: 8,
                      padding: '6px 10px',
                      color: '#fff',
                      fontWeight: 'bold',
                      userSelect: 'none',
                      textAlign: 'center',
                      minWidth: 80,
                      boxShadow: '0 0 6px rgba(0,0,0,0.3)',
                    }}
                  >
                    {name}
                  </div>
                </AdvancedMarkerWithRef>

                {/* Anchor point visualization marker */}
                <AdvancedMarkerWithRef
                  onMarkerClick={() => onMarkerClick(id, position)}
                  zIndex={zIndex + 1}
                  onMouseEnter={() => onMouseEnter(id)}
                  onMouseLeave={onMouseLeave}
                  anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
                  position={position}
                >
                  <div className="visualization-marker" />
                </AdvancedMarkerWithRef>
              </React.Fragment>
            );
          }

          return null;
        })}

        {infoWindowShown && selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            pixelOffset={[0, -2]}
            onCloseClick={handleInfowindowCloseClick}
          >
            <div>
              <h2>{markers.find(m => m.id === selectedId)?.name}</h2>
              <p>{markers.find(m => m.id === selectedId)?.address}</p>
            </div>
          </InfoWindow>
        )}
      </Map>

      <ControlPanel
        anchorPointName={anchorPoint}
        onAnchorPointChange={(newAnchorPoint: keyof typeof AdvancedMarkerAnchorPoint) =>
          setAnchorPoint(newAnchorPoint)
        }
      />
    </APIProvider>
  );
};

export const AdvancedMarkerWithRef = (
  props: AdvancedMarkerProps & {
    onMarkerClick: () => void;
  }
) => {
  const { children, onMarkerClick, ...advancedMarkerProps } = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        onMarkerClick();
      }}
      ref={markerRef}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
};

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
