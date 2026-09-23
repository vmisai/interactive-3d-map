import { forwardRef } from "react";
import { OrbitControls } from "@react-three/drei";

const CameraControls = forwardRef((props, ref) => {
    return (
        <OrbitControls
            ref={ref}
            makeDefault
            enableDamping
            dampingFactor={0.08}
            minDistance={7}
            maxDistance={45}
        />
    );
});

export default CameraControls;
