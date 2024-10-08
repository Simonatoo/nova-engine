import { GameObject } from '../core/GameObject';
import global from '../global/global';

export interface SpriteConfig {
    name: string
    width?: number
    height?: number
}
export class Sprite extends GameObject {
    config: SpriteConfig;
    image:HTMLImageElement|undefined;

    constructor(config: SpriteConfig) {
        super();
        this.config = config;
    }

    render(): void {
        const canvas = document.body.querySelector('canvas');
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        this.image = global.getResource(this.config.name);
        if (!this.image) return;
        this.update(0);
        ctx.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
    }

    update(deltatime: number): void {
        this.transform.width = this.config.width ?? this.image?.width ?? 0;
        this.transform.height = this.config.height ?? this.image?.height ?? 0;
        this.transform.position.x += this.physics.velocity.x;
        this.transform.position.y += this.physics.velocity.y;
    }
}