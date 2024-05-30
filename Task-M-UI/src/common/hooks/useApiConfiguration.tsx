
import {useAuth} from "./userAuth.tsx";
import {Configuration} from "../../Api/generated";

const useApiConfiguration = () => {
    const {accessToken} = useAuth();
    return new Configuration({accessToken: accessToken || ""})
};

export default useApiConfiguration;