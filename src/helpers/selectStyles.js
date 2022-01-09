function selectStyles() {
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            color: "var(--primary-color)",
            background: "var(--offwhite-color",
            borderRadius: state.isFocused ? "2rem" : "2rem",
            borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)",
            // boxShadow: state.isFocused ? null : null,
            "&:hover": {
                borderColor: state.isFocused ? "var(--primary-color)" : "var(--primary-color)"
            }
        }),
        menu: (base) => ({
            ...base,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: (base) => ({
            ...base,
            padding: 0
        })
    };

    return selectStyles;
}

export default selectStyles;