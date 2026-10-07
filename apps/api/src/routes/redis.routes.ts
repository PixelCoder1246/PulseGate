import { Router } from 'express';
import { redis } from '../config/redis.js';

const router = Router();

router.get('/test', async (_req, res) => {
    try {
        const ping = await redis.ping();

        await redis.set('pulsegate:test', 'hello-redis');

        const value = await redis.get('pulsegate:test');

        res.status(200).json({
            ping,
            value,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Redis test failed',
        });
    }
});

export default router;