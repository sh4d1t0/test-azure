import React from "react";
import PropTypes from "prop-types";
import { Container } from "financiera-ui";

const HeaderInfo = props => {
    const { data = [] } = props;

    return (
        <Container>
            {data.map(item => {
                return (
                    <div className="mn-header-info-column">
                        <div className="label">
                            {item.label}
                        </div>
                        <div className="value">
                            {item.value}
                        </div>
                    </div>
                );
            })}
        </Container>
    );
};

HeaderInfo.propTypes = {
    data: PropTypes.array.isRequired
};

export default HeaderInfo;
