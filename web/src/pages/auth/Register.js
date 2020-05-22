import React, { useState } from "react";
import Layout from "../../components/Layout";
import {
  Card,
  Input,
  Button,
  Checkbox,
  Steps,
  Form,
  Select,
  Tooltip,
  Divider,
  Result,
  Spin,
  message,
} from "antd";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import styles from "./register.module.scss";
import { v4 as uuid } from "uuid";
import {
  registerUserInformationModel,
  registerDriverLicenceModel,
} from "./../../models/Models";
import { signIn, register } from "../../services/AuthService";
import {
  registerDriverLicenceService,
  checkIdentity,
} from "../../services/UserService";
import DriverLicenceForm from "../../components/base/DriverLicenceForm";

// eslint-disable-next-line
String.prototype.turkishToLower = function () {
  var string = this;
  var letters = { İ: "i", I: "ı", Ş: "ş", Ğ: "ğ", Ü: "ü", Ö: "ö", Ç: "ç" };
  string = string.replace(/(([İIŞĞÜÇÖ]))/g, function (letter) {
    return letters[letter];
  });
  return string.toLowerCase();
};
// eslint-disable-next-line
String.prototype.turkishToUpper = function () {
  var string = this;
  var letters = { i: "İ", ş: "Ş", ğ: "Ğ", ü: "Ü", ö: "Ö", ç: "Ç", ı: "I" };
  string = string.replace(/(([iışğüçö]))/g, function (letter) {
    return letters[letter];
  });
  return string.toUpperCase();
};

const { Step } = Steps;
const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const steps = [
  {
    title: "Kişisel bilgiler",
    content: "First-content",
  },
  {
    title: "Ehliyet bilgileri",
    content: "Second-content",
  },
  {
    title: "Her şey hazır!",
    content: "Last-content",
  },
];
const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Register(props) {
  let history = useHistory();
  const [current, setcurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const [userFormValues, setUserFormValues] = useState(
    registerUserInformationModel
  );
  const [driverLicenceFormValues, setDriveLicenceFormValues] = useState(
    registerDriverLicenceModel
  );
  let registerData = {};

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="90">+90</Option>
      </Select>
    </Form.Item>
  );
  const registerUserInformation = () => {
    return (
      <Form
        {...formItemLayout}
        name="register"
        onValuesChange={onUserFormValuesChange}
        id="userForm"
        initialValues={{
          prefix: "90",
        }}
        scrollToFirstError
        style={{ overflow: "scroll" }}
      >
        <Form.Item
          name="name"
          label="Adınız"
          rules={[
            {
              required: true,
              message: "Lütfen isim soyisim bilgisi giriniz!",
            },
          ]}
        >
          <Input placeholder="Reyhan Aydoğmuş" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-Posta"
          rules={[
            {
              type: "email",
              message: "Lütfen geçerli bir e-posta adresi giriniz!",
            },
            {
              required: true,
              message: "Lütfen e-posta adresinizi giriniz!",
            },
          ]}
        >
          <Input placeholder="reyhan@quincerenting.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Parola"
          rules={[
            {
              required: true,
              message: "Lütfen parola giriniz!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Parola Doğrula"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Lütfen parolanızı yeniden yazın!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Girilen parolalar eşleşmiyor!");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="username"
          label={
            <span>
              Kullanıcı Adı&nbsp;
              <Tooltip title="Size nasıl seslenelim?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Lütfen bir kullanıcı adı giriniz!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="reyhanaydogmus" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Telefon Numarası"
          rules={[
            {
              required: true,
              message: "Lütfen telefon numaranızı giriniz!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            placeholder="554 400 0000"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox>
            Kullanım sözleşmesini okudum. <a href="!#">Kabul ediyorum.</a>
          </Checkbox>
        </Form.Item>

        {/* <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Kayıt Ol!
                                </Button>
                            </Form.Item> */}
        <Divider />
        <p>
          Zaten bir hesabınız var mı? <Button type="link">Giriş yapın!</Button>
        </p>
      </Form>
    );
  };
  const registerDriverLicence = () => {
    return (
      <DriverLicenceForm
        userCredentials={props.userCredentials}
        driverLicenceFormValues={driverLicenceFormValues}
        setDriveLicenceFormValues={setDriveLicenceFormValues}
      />
    );
  };
  const route = (path) => {
    history.push(`${path}`);
    window.location.reload();
  };

  const registerAllDone = () => {
    return (
      <Result
        status="success"
        title="Artık aramızdasın!"
        subTitle={`Merhaba ${props.userCredentials["user_inf"].name}! Üyeliğini oluşturduk, artık kampanyalarımız ve size özel tekliflerimizden yararlanabileceksin. Tebrikler!"`}
        extra={[
          <>
            <Button type="primary" onClick={() => route("/")}>
              Hemen Araç Kirala!
            </Button>
            <Button onClick={() => route("/profile")}>Hesabım</Button>
          </>,
        ]}
      />
    );
  };
  const userRegister = () => {
    const name = userFormValues.name.split(" ");
    if (name.length === 3)
      registerData = {
        ...registerData,
        email: userFormValues.email,
        name: name[0] + " " + name[1],
        password: userFormValues.password,
        phoneNumber: userFormValues.phoneNumber,
        surname: name[2],
        username: userFormValues.username,
      };
    else
      registerData = {
        ...registerData,
        email: userFormValues.email,
        name: name[0],
        password: userFormValues.password,
        phoneNumber: userFormValues.phoneNumber,
        surname: name[1],
        username: userFormValues.username,
      };

    if (
      registerData.email === "" ||
      registerData.name === "" ||
      registerData.password === "" ||
      registerData.phoneNumber === "" ||
      registerData.username === "" ||
      userFormValues.agreement === false ||
      userFormValues.confirm === ""
    ) {
      setLoading(false);
      if (registerData.name === "") {
        message.info("Devam edebilmek için isminize ihtiyacımız var! :)");
      } else if (registerData.email === "") {
        message.info(
          "Devam edebilmek için e-posta adresinize ihtiyacımız var! :)"
        );
      } else if (registerData.password === "") {
        message.info(
          "Devam edebilmek için parola girmenize ihtiyacımız var! :)"
        );
      } else if (userFormValues.confirm === "") {
        message.info(
          "Devam edebilmek için formu tam olarak doldurmanıza ihtiyacımız var! :)"
        );
      } else if (registerData.username === "") {
        message.info(
          "Devam edebilmek için eşsiz bir kullanıcı adı seçmek istemez misiniz? :)"
        );
      } else if (registerData.phoneNumber === "") {
        message.info(
          "Devam edebilmek için telefon numaranıza ihtiyacımız var! :)"
        );
      } else if (userFormValues.agreement === false) {
        message.info(
          "Devam edebilmek için kullanım sözleşmemizi kabul etmenize ihtiyacımız var! :)"
        );
        console.log(userFormValues);
      }
    } else {
      console.log(registerData);
      register(registerData).then((res) => {
        console.log(res);
        if (res["result"] === "True") {
          const loginData = {
            username: userFormValues.username,
            password: userFormValues.password,
          };
          signIn(loginData).then((res) => {
            props.setLoginCredentials(res);
            setcurrent(current + 1);
          });
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          if (
            res["info"] ===
            "There is already a user registered with the username provided!"
          )
            message.warning(
              `'${userFormValues.username}' kullanıcı adı alınmış. Yeni eşsiz bir kullanıcı adı seçebilir misiniz? :)`
            );
          else if (
            res["info"] ===
            "There is already a user registered with the email provided!"
          )
            message.warning(
              `'${userFormValues.email}' adresi ile bir üyelik bulunuyor. Giriş yapmayı unutmuş olabilir misiniz? :)`
            );
          else if (
            res["info"] ===
            "There is already a user registered with the credentials provided!"
          )
            message.warning(
              `Verdiğiniz bilgiler ile bir üyelik bulunuyor. Giriş yapmayı unutmuş olabilir misiniz? :)`
            );
        }
        setLoading(false);
      });
    }
  };
  const driverLicenceRegister = () => {
    const name = props.userCredentials["user_inf"].name;
    const surname = props.userCredentials["user_inf"].surname;
    const birthYear = driverLicenceFormValues.birthDate.split(".");
    const driverLicenceData = {
      birthDate: driverLicenceFormValues.birthDate,
      birthLocation: driverLicenceFormValues.birthLocation,
      name: name,
      surname: surname,
      dateOfIssue: driverLicenceFormValues.dateOfIssue,
      validTime: driverLicenceFormValues.validTime,
      documentNo: driverLicenceFormValues.documentNo,
      tcno: driverLicenceFormValues.tcno,
      office: driverLicenceFormValues.office,
    };
    console.log(driverLicenceData);
    const identityData = {
      name: name.turkishToUpper(),
      surname: surname.turkishToUpper(),
      tcNo: driverLicenceFormValues.tcno,
      year: birthYear[2],
    };
    console.log(identityData);
    checkIdentity(identityData)
      .then((res) => {
        console.log(res);
        if (res === true) {
          registerDriverLicenceService(driverLicenceData).then((res) => {
            console.log(res);
            if (res) {
              const loginData = {
                username: userFormValues.username,
                password: userFormValues.password,
              };
              signIn(loginData).then((res) => {
                props.setLoginCredentials(res);
                setcurrent(current + 1);
              });
              setTimeout(() => {
                setLoading(false);
              }, 2000);

              setcurrent(current + 1);
            } else {
            }
            setLoading(false);
          });
        } else if (res === false)
          message.warning(
            "Kimlik bilgileriniz doğrulanamadı, lütfen tekrar dener misiniz? :)"
          );
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUserFormValuesChange = (values) => {
    const userFormValue = {
      ...userFormValues,
      ...values,
    };
    setUserFormValues(userFormValue);
  };

  const next = (step) => {
    if (step === 1) {
      setLoading(true);
      userRegister();
    } else if (step === 2) {
      setLoading(true);
      driverLicenceRegister();
    }
  };

  const skip = () => {
    history.push("/");
  };

  return (
    <Layout userCredentials={props.userCredentials}>
      <Card
        className="card card-bg"
        title="Kayıt Ol"
        extra={
          current < steps.length - 1 && current <= 0 ? (
            <Button type="primary" onClick={() => next(1)}>
              İleri
            </Button>
          ) : current < steps.length - 1 && current > 0 ? (
            <>
              <Button style={{ marginRight: 8 }} onClick={() => skip()}>
                Atla
              </Button>
              <Button type="primary" onClick={() => next(2)}>
                İleri
              </Button>
            </>
          ) : current === steps.length - 1 ? (
            <Button
              type="primary"
              onClick={() => console.log("Processing complete!")}
            >
              Bitti
            </Button>
          ) : null
        }
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={uuid()} title={item.title} />
          ))}
        </Steps>
        <Spin indicator={antIcon} spinning={loading}>
          <div className={styles.content}>
            {current === 0
              ? registerUserInformation()
              : current === 1
              ? registerDriverLicence()
              : current === 2
              ? registerAllDone()
              : null}
          </div>
        </Spin>
      </Card>
    </Layout>
  );
}
