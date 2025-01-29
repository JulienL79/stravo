import { Icon } from "@common-atoms/Icon"
import { Link } from "react-router-dom"
import { Button } from "@common-atoms/Button"
import { IFooterActivityProps } from "./FooterActivity.props"
import "./FooterActivity.css"
import React from "react"

export const FooterActivity : React.FC<IFooterActivityProps> = ({activity_id}) => {
    return (
        <div className="footer-activity">
            <Button className="footer-btn" content={<Icon name="ThumbsUp"} onClick={}/>
        </div>
    )
}