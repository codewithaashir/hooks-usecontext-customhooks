import { useEffect, useRef, useState } from 'react';
import { HTTPRequest, errorHandler } from 'config/index';

const useApi = (endPoint, params, instantFetch = true, headers = {}) => {
    const mounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const get = async () => {
        const { data: _data } = await HTTPRequest.get(endPoint, { headers: { ...headers, params } });
        return _data.data || _data;
    };

    const post = async (body = {}) => {
        const { data: _data } = await HTTPRequest.post(endPoint, body, { headers: { ...headers, params } });
        return _data.data || _data;
    };

    const update = async (body) => {
        const { data: _data } = await HTTPRequest.patch(endPoint, body, { headers: { ...headers, params } });
        return _data.data || _data;
    };

    const destroy = async () => {
        const { data: _data } = await HTTPRequest.delete(endPoint, { headers: { ...headers, params } });
        return _data.data || _data;
    };

    const methodSelector = async (method, body) => {
        switch (method) {
            case 'get':
                return await get();
            case 'post':
                return await post(body);
            case 'update':
                return await update(body);
            case 'delete':
                return await destroy();

            default:
                return await get();
        }
    };

    const apiCall = async (method, body) => {
        let result = false;
        try {
            setLoading(true);
            const _data = await methodSelector(method, body);
            mounted.current && setData(_data);
            result = true;
        } catch (err) {
            return errorHandler(err);
        } finally {
            mounted.current && setLoading(false);
            return result;
        }
    };

    const resetData = () => {
        setData([]);
    };

    useEffect(() => {
        mounted.current = true;
        if (instantFetch) apiCall('get');
        return () => {
            mounted.current = false;
        };
    }, []);

    return {
        data, loading,
        get: () => apiCall('get'),
        post: () => apiCall('post'),
        update: () => apiCall('update'),
        destroy: () => apiCall('destroy'),
        resetData,
    };
};

export default useApi;