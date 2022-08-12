import sha256 from 'js-sha256';

export const encrypt = pwd => sha256.create().update(pwd).hex()