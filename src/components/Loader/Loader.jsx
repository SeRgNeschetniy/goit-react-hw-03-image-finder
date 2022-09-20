import { MagnifyingGlass } from 'react-loader-spinner';
//import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { LoaderWrapp } from './Loader.module';

export default function Loader() {
  return (
    <LoaderWrapp>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </LoaderWrapp>
  );
}