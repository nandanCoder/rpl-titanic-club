import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DonationEmailProps {
  userName?: string;
  paymentDate?: Date;
  amount?: number;
  paymentId?: string;
  paymentScreenShot?: string;
  id?: string;
}

export const PaymentEmail = ({
  userName,
  paymentDate,
  amount,
  paymentId,
  paymentScreenShot,
  id,
}: DonationEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(paymentDate);

  return (
    <Html>
      <Head />
      <Preview>Heartfelt Thanks for Your Generous Donation</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Text style={heading}>Receipt</Text>
          </Section>

          <Section style={content}>
            {/* <Row>
              <Img
                style={image}
                width={620}
                src={`${baseUrl}/static/yelp-header.png`}
              />
            </Row> */}
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}>
                  Hi {userName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}>
                  We noticed a recent donation amount of ${amount} received from
                  you.
                </Heading>

                <Text style={paragraph}>
                  <b>Time: </b>
                  {formattedDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Name: </b>
                  {userName}
                </Text>
                {paymentId ? (
                  <Text style={{ ...paragraph, marginTop: -5 }}>
                    <b>Payment Id: </b>
                    {paymentId}
                  </Text>
                ) : (
                  <Row style={{ ...boxInfos, paddingTop: "0" }}>
                    <Column style={containerButton} colSpan={2}>
                      <Button
                        onClick={() => window.open(paymentScreenShot)}
                        style={button}>
                        Learn More
                      </Button>
                    </Column>
                  </Row>
                )}
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}>
                  *Your donation will appear on your account within 24 hours 😊
                  receipt id: {id}
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}>
                  I hope this message finds you well.I hope this message finds
                  you well.
                </Text>

                <Text style={paragraph}>
                  On behalf of [Titanic club (RPL)], I wanted to extend our
                  heartfelt thanks for your generous donation. Your support is
                  invaluable to us and plays a crucial role in enabling us to
                  continue our mission of [briefly describe your organization's
                  mission or specific project the donation will support].
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Your contribution will make a significant difference in
                  [explain the impact of the donation, such as helping more
                  people, funding a specific project, improving facilities,
                  etc.]. We are deeply grateful for your willingness to help and
                  your trust in our work.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Thanks to your generosity, we are one step closer to achieving
                  our goals. We will keep you updated on our progress and the
                  positive changes your donation is helping to bring about.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Once again, thank you for your support. If you have any
                  questions or would like to know more about how your donation
                  is being used, please feel free to contact us.
                </Text>
              </Column>
            </Row>
            //{" "}
            {/* <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button
                  onClick={() => window.open(paymentScreenShot)}
                  style={button}>
                  Learn More
                </Button>
              </Column>
            </Row> */}
          </Section>

          <Section style={containerImageFooter}>
            {/* <Img
              style={image}
              width={620}
              src={`${baseUrl}/static/yelp-footer.png`}
            /> */}
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}>
            {/* © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
            U.S.A. | www.yelp.com */}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// YelpRecentLoginEmail.PreviewProps = {
//   userFirstName: "Alan",
//   loginDate: new Date("September 7, 2022, 10:58 am"),
//   loginDevice: "Chrome on Mac OS X",
//   loginLocation: "Upland, California, United States",
//   loginIp: "47.149.53.167",
// } as YelpRecentLoginEmailProps;

export default PaymentEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
