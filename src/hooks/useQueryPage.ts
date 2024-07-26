import { useLocation } from 'react-router-dom';

export const useQueryPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    return isNaN(page) ? 1 : page;
}
