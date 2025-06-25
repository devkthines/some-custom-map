import * as React from 'react';
import { AdvancedMarkerAnchorPoint } from '@vis.gl/react-google-maps';
import { AnchorPointName } from './app';
import { rawLocations } from './locations';

// Color mapping from above or import it if separated
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

function getColorByStore(name: string): string {
  for (const key of Object.keys(storeColors)) {
    if (name.toLowerCase().includes(key.toLowerCase())) {
      return storeColors[key];
    }
  }
  return '#6c757d'; // fallback grey
}

interface Props {
  anchorPointName: AnchorPointName;
  onAnchorPointChange: (anchorPointName: AnchorPointName) => void;
}

const ControlPanel: React.FC<Props> = (props) => {
  // Get unique stores for legend
  const uniqueStores = React.useMemo(() => {
    const map = new Map<string, string>();
    rawLocations.forEach((loc) => {
      if (!map.has(loc.name)) {
        map.set(loc.name, getColorByStore(loc.name));
      }
    });
    return Array.from(map.entries());
  }, []);

  return (
    <div className="control-panel" style={{ maxWidth: 350, padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <h3>Store Locations Map Controls & Legend</h3>

      <section style={{ marginBottom: 16 }}>
        <h4>How to use:</h4>
        <ul style={{ paddingLeft: 20 }}>
          <li>Hover over markers to scale them up.</li>
          <li>Click a marker to select it and view details.</li>
          <li>Click outside markers to clear selection.</li>
          <li>Use the dropdown below to change marker anchor points (affects popup positioning).</li>
        </ul>
      </section>

      <section style={{ marginBottom: 16 }}>
        <label htmlFor="anchorPointSelect" style={{ fontWeight: 'bold', display: 'block', marginBottom: 4 }}>
          Marker Anchor Point:
        </label>
        <select
          id="anchorPointSelect"
          value={props.anchorPointName}
          onChange={(event) => props.onAnchorPointChange(event.currentTarget.value as AnchorPointName)}
          style={{ width: '100%', padding: 8, fontSize: 14 }}
        >
          {Object.keys(AdvancedMarkerAnchorPoint).map((anchorPoint) => (
            <option key={anchorPoint} value={anchorPoint}>
              {anchorPoint}
            </option>
          ))}
        </select>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h4>Legend</h4>
        <ul style={{ listStyle: 'none', padding: 0, maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', borderRadius: 4 }}>
          {uniqueStores.map(([name, color]) => (
            <li
              key={name}
              style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #eee' }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  borderRadius: 4,
                  marginRight: 12,
                  border: '1px solid #999',
                }}
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4>Marker Types</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <span
              style={{
                display: 'inline-block',
                width: 20,
                height: 20,
                backgroundColor: '#e63946',
                borderRadius: 4,
                marginRight: 8,
                border: '1px solid #999',
                verticalAlign: 'middle',
              }}
            />
            <strong>Pin</strong>: Food 4 Less stores (red markers)
          </li>
          <li>
            <span
              style={{
                display: 'inline-block',
                width: 20,
                height: 20,
                backgroundColor: '#1d3557',
                borderRadius: 4,
                marginRight: 8,
                border: '1px solid #999',
                verticalAlign: 'middle',
              }}
            />
            <strong>HTML Marker</strong>: Other stores
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 16, fontSize: 12, color: '#555' }}>
        <p>
          Markers with blue backgrounds have collision detection enabled to avoid overlapping. See{' '}
          <a
            href="https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElement.collisionBehavior"
            target="_blank"
            rel="noreferrer"
          >
            collision detection docs
          </a>{' '}
          for more info.
        </p>
      </section>
    </div>
  );
};

export default React.memo(ControlPanel);

