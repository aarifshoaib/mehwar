import { useContext } from "react";
import { AuthContext } from "../../auth/redux/auth.context";

export const getLookups = async (lookuptype, name, data) => {
    if(data.length > 0){
        const lookup = await data.find(lookup => lookup.lookupType === lookuptype && lookup.name === name);
        if (lookup) {
            return lookup.description;
        }
        return name;
    }
    return name;
};