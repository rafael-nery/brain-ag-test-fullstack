import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "@/store/store.ts";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return {
    ...auth,
    dispatch
  };
};