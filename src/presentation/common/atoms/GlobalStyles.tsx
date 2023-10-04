import { Global, css } from "@emotion/react";
import { ReactElement } from "react";

export const GlobalStyles = (): ReactElement => {
  return (
    <Global
      styles={css`
        :root {
          --stadium: rgba(227, 242, 207, 0.55);
          --landcover: rgba(197, 225, 178, 0.35);
          --tunnel-casing: rgba(217, 217, 217, 1);
          --tunnel: rgba(247, 247, 247, 1);
          --road-network-casing: rgba(217, 217, 217, 1);
          --road-network: rgba(255, 255, 255, 1);
          --road-path: rgba(204, 204, 204, 1);
          --building: rgba(222, 222, 222, 1);
          --border-other-dash: rgba(226, 198, 200, 1);
          --road: rgba(107, 122, 133, 1);
          --icon-color: rgba(120, 120, 120, 1);
          --primary: #2d264b;
          --background: #f5f5f5;
        }
        #root {
          background-color: var(--road);
        }
        .road {
          font-size: 7.367790699005127px;
          font-family: "Inter";
          font-weight: 400;
          font-style: normal;
          text-decoration: none;
          text-transform: none;
        }
        .button {
          box-shadow: 4px 4px 6px rgba(161, 161, 161, 0.03);
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        * {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          ::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
        }
      `}
    />
  );
};
