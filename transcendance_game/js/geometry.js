game.geometry = {

    
    angleToRadians : function (angle){
        return angle / 180 * Math.PI;
    },
    angleToDegrees : function (angle){
        return angle * 180 / Math.PI;
      
    },
    lineAngle : function(p1x, p1y, p2x, p2y){
        return this.angleToDegrees(Math.atan2(p2y - p1y, p2x - p1x));
    },
    pointTranslate : function(px, py, angle = 0, distance = 0){
        const r = this.angleToRadians(angle);
        return [px + distance * Math.cos(r), py + distance * Math.sin(r)];
    },
    randomDirection(min, max) {
        return Math.random() * (max - min) + min;
    }
      
}