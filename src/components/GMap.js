import React from 'react';
import PropTypes from 'prop-types';
//https://github.com/MicheleBertoli/react-gmaps
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';

const params = { v: '3.exp', key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA' };

// const baseDir = (process.env.NODE_ENV === 'production')? '/depts/health/environmental-health/food-safety/inspection-system/qa-search.aspx/#/details/':'/#/details/';
const baseDir = '#/details/';


class GMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLocation: null
    };
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.renderInfoWindows = this.renderInfoWindows.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { restaurants } = this.props;
    const { map } = this.state;

    if (restaurants.length === 0) {
      return;
    }

    if (this.props.pagerNum !== prevProps.pagerNum) {
      const bounds = new google.maps.LatLngBounds();
      restaurants.forEach((restaurant) => {
        const lat = restaurant.businessLocationLat;
        const lng = restaurant.businesssLocationLong;
        bounds.extend(new google.maps.LatLng(lat, lng));
      });
      map.fitBounds(bounds);
    }
  }

  onMapCreated(map) {
    this.setState({ map });
    //https://developers.google.com/maps/documentation/javascript/controls
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    });
    const { restaurants } = this.props;
    const bounds = new google.maps.LatLngBounds();

    if (restaurants.length === 0) {
      return;
    }

    restaurants.forEach((restaurant) => {
      const lat = restaurant.businessLocationLat;
      const lng = restaurant.businesssLocationLong;
      bounds.extend(new google.maps.LatLng(lat, lng));
    });

    map.fitBounds(bounds);
    // https://stackoverflow.com/questions/19719574/google-maps-svg-image-marker-icons-not-showing-in-ie11
    // TODO: Move this to a seperate function that is activated on click
    // add Current location to state
    // Use this package to get distances: https://github.com/edwlook/node-google-distance
    // Or I can roll my own this: https://developers.google.com/maps/documentation/distance-matrix/intro
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.props.setCurrentLocation([pos.lat, pos.lng]);

        this.setState({ currentLocation: pos });
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
        });


        // console.log(Math.round(Distance([47.595940, -122.330081], [pos.lat, pos.lng]) * 100) / 100);


        // properties': {},
        //     'geometry': {
        //       'type': 'Point',
        //       'coordinates': [47.595940, -122.330081]
        //     }
        //   };
        //   const to = {
        //     'type': 'Feature',
        //     'properties': {},
        //     'geometry': {
        //       'type': 'Point',
        //       'coordinates': [47.601496, -122.329824]
        //     }
        // map.setCenter(pos);
        // distance.get({
        //   origin: '47.608013, -122.335167',
        //   destination:
        // })
        // this.props.restaurants

      }.bind(this), function () {
        //handle location error (i.e. if user disallowed location access manually)
      }, );
    } else {
      // Browser doesn't support Geolocation
    }
  }

  renderMarkers() {
    const { restaurants } = this.props;
    const { activeItem } = this.props;
    return restaurants.map((restaurant) => {
      const rating = Ratings.getRatings(restaurant.businessGrade);
      const lat = restaurant.businessLocationLat;
      const lng = restaurant.businesssLocationLong;
      const id = restaurant.businessRecordId;
      // const icon = (activeItem === id) ?
      const icon = {
        url: 'http://www.kingcounty.gov/~/media/depts/health/environmental-health/images/food-safety/inspections/' + rating.img + '_pin.svg'
      };
      // '//maps.google.com/mapfiles/ms/icons/green-dot.png'
      // 'http://www.kingcounty.gov/~/media/depts/health/environmental-health/images/food-safety/inspections/excellent_pin.svg':
      // 'http://www.kingcounty.gov/~/media/depts/health/environmental-health/images/food-safety/inspections/okay_pin.svg';
      // Add animation
      return (
        <Marker
          icon={icon}
          ref={id}
          key={id}
          lat={lat}
          lng={lng}
          onClick={() => {
            this.onMarkerClick(id, true);
          }}
        />
      );
    }
    );
  }
  renderInfoWindows() {
    const { restaurants } = this.props;
    const { activeItem } = this.props;

    return restaurants.map((restaurant) => {
      const id = restaurant.businessRecordId;
      if (id === activeItem) {
        const lat = restaurant.businessLocationLat;
        const lng = restaurant.businesssLocationLong;
        const name = StringHelper.capitalCase(restaurant.businessName);

        return (
          <InfoWindow
            lat={lat}
            lng={lng}
            key={id + '-infowindow'}
            pixelOffset={new google.maps.Size(0, -30)}
            content={'<div style="line-height:1.35"><strong>' + name + '</strong><br /> <a href="' + baseDir + id + '">History <span class="fa fa-chevron-right fa-color-primary" /></a></div>'}
            onCloseClick={() => this.onMarkerClick(null, false)}
          />
        );
      }
    });
  }

  onMarkerClick(id, scroll) {
    this.props.setActiveItem(id, scroll);
  }

  render() {
    const { restaurants } = this.props;
    let height = ($(window).width() < 768) ? '300px' : '600px';
    if (restaurants.length === 0) {
      return <div />;
    }

    return (
      <div className="iframe-container">
        <Gmaps
          ref="gmaps"
          height={height}
          onMapCreated={this.onMapCreated}
          zoom={14}
          params={params}>
          {this.renderMarkers()}
          {this.renderInfoWindows()}
        </Gmaps>
      </div>
    );
  }
}

GMap.propTypes = {
  restaurants: PropTypes.array.isRequired,
  filter: PropTypes.string,
  activeItem: PropTypes.string,
  pagerNum: PropTypes.number,
  setActiveItem: PropTypes.func.isRequired
};

export default GMap;
