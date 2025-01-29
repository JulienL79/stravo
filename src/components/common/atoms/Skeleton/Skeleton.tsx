import { ISkeletonProps } from "./Skeleton.props";
import React from "react";
import "./Skeleton.css"

export const Skeleton: React.FC<ISkeletonProps> = ({
    width = "100%",
    height = "1rem",
    borderRadius = "4px"
}) => {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius
            }}
        />
    )
};