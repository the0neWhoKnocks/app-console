const pad = (val, token = '00') => token.substring(0, token.length - `${val}`.length) + val;

export default pad;
