import { AutoComplete as AutoCompleteAntd, Input } from "antd";
import PropTypes from "prop-types";
String.prototype.turkishToLower = function () {
  var string = this;
  var letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};

String.prototype.turkishToUpper = function () {
  var string = this;
  var letters = { i: "İ", ş: "Ş", ğ: "Ğ", ü: "Ü", ö: "Ö", ç: "Ç", ı: "I" };
  string = string.replace(/(([iışğüçö]))/g, function (letter) {
    return letters[letter];
  });
  return string.toUpperCase();
};

export default function AutoComplete({
  className,
  options,
  placeholder,
  onSelect
}) {
  return (
    <AutoCompleteAntd
      className={className}
      options={options}
      filterOption={(inputValue, option) =>
        option.value.turkishToUpper().indexOf(inputValue.turkishToUpper()) !==
        -1
      }
      onSelect={onSelect}
    >
      <Input.Search
        size="large"
        style={{ textAlign: "center" }}
        placeholder={placeholder}
        enterButton
      />
    </AutoCompleteAntd>
  );
}

AutoComplete.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func
};
