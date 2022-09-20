import { MagnifyingGlass } from 'react-loader-spinner';
import { LoaderWrapp } from './Loader.module';

export default function Loader() {
  return (
    <LoaderWrapp>
      <MagnifyingGlass
        visible={true}
        height="100"
        width="100"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </LoaderWrapp>
  );
}
