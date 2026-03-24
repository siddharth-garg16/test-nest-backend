import { UserType } from "../common/enums/user-type.enum";
import { User } from "../models/user.model";

export const seedAdmin = async (adminEmail, adminPassword): Promise<void> => {
    try {
        const existing = await User.findOne({ emailId: adminEmail });
        if (existing) {
            console.log("Admin user already exists");
            return;
        }

        await User.create({
            firstName: "Admin",
            lastName: "Admin",
            emailId: adminEmail,
            password: adminPassword,
            userType: UserType.ADMIN,
        });

        console.log("Admin user seeded successfully");
    } catch (err) {
        console.error(`Error seeding admin user: ${err}`);
    }
};
